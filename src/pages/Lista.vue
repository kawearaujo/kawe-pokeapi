
<template>

  <div class="wrapmain">
    <div class="grid">
      <div class="pokemon" v-for="pokemon in paginatedPokemons" :key="pokemon.id">
        <p class="pokemon-number"># {{ pokemon.number }}</p>
        <div class="pokemon-image">
          <img :src="pokemon.imageUrl" :alt="pokemon.name">
        </div>
        <div class="pokemon-info">
          <h2 class="pokemon-name">{{ pokemon.name }}</h2>
          <p class="pokemon-types">
            <span v-for="(type) in pokemon.types" :key="type">{{ type }}</span>
          </p>
          <p class="pokemon-weight">Weight: {{ pokemon.weight }} kg</p>
        </div>
      </div>
      <!-- <pagination :data="pokemons" :limit="8" :show-disabled="true" :align="center"></pagination> -->

    </div>
  <div class="paginacao">
    <Paginate 
      :list="pokemonList" 
      :per="8" 
      :page-count="pageCount" 
      :displayed-pages="4" 
      :prev-text="'Anterior'" 
      :next-text="'Próxima'" 
      @change="changePage"
      container-class="paginacaotexto"
      >
      
    </Paginate>
  </div>
    <!-- <ul style="display: flex;list-style: none;">
      <li style="padding-right: 10px;" v-for="pageNumber in totalPages" :key="pageNumber">
        <button @click="currentPage = pageNumber">
          {{ pageNumber }}
        </button>
      </li>
    </ul>
   </div> -->
  </div>
    
</template>

<script>
import Paginate from 'vuejs-paginate';
import axios from 'axios';

export default {
  name:'ListaPage',
  components:{
    Paginate,
  },
  data() {
    return {
      pokemons: [],
      currentPage: 1
    };
  },
  computed: {
    paginatedPokemons() {
      const start = (this.currentPage - 1) * 8;
      const end = start + 8;
      return this.pokemons.slice(start, end);
    },
    
    totalPages() {
    return Math.ceil(this.pokemons.length / 8);
    },
    pokemonList() {
      const start = (this.currentPage -1) * 8;
      const end = start + 8;
      return this.pokemons.slice(start, end);
    },
    pageCount() {
      return Math.ceil(this.pokemons.length / 8);
    }
  },
  mounted() {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => {
        const promises = response.data.results.map(result => {
          return axios.get(result.url);
        });
        Promise.all(promises).then(responses => {
          this.pokemons = responses.map(response => {
            return {
              id: response.data.id,
              name: response.data.name,
              number: response.data.id.toString().padStart(3, '0'),
              weight: response.data.weight / 10,
              types: response.data.types.map(type => type.type.name),
              imageUrl: response.data.sprites.front_default
            };
          });
        });
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods:{
    changePage(page) {
      this.currentPage = page;
    },
  }
};
</script>

<style scoped>
.pokedex {
  display: flex;
  
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;
  padding: 1rem;
}
.grid{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  justify-items: center;
}
.wrapmain{
  min-height: 80vh;
  margin-top: 2vh;
  margin-bottom: calc(100vh-60px);
  margin-left: 30px;
  margin-right: 30px;
}
.pokemon {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 220px;
  height: 220px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  padding: 1rem;
  transition: box-shadow 0.2s ease-in-out;
  
}
.pokemon-info{
  text-align: center;
  font-weight: 600;
}
.pokemon:hover {
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
}

.pokemon-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.5rem;
}

.pokemon-number {
  font-size: 1.5rem;
  font-weight: bold;
}

.pokemon-name {
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: capitalize;
}

.pokemon-image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
}

.pokemon-image img {
  max-width: 100%;
  max-height: 100%;
}
.paginacao{
  display: flex;
  justify-content: center ;
  width: 100%;
}
ul {
  display: flex;
  list-style: none;
  padding: 10px;
}
.paginacaotexto{
  display: flex;
  justify-content: space-between;
  padding: 10px;
  /* border: rgb(66, 64, 64)232 solid 1px;
  border-radius: 8px;
  box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.1);
  gap:10px; */
  /* font-size: 1px; */
  padding: 0px 50px;
  
  /* margin: 50px; */
}
</style>