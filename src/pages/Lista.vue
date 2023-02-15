<template>
  <div class="pokedex">
    <div class="pokemon" v-for="pokemon in pokemons" :key="pokemon.id">
      <div class="pokemon-header">
        <span class="pokemon-number">#{{ pokemon.id }}</span>
        <span class="pokemon-name">{{ pokemon.name }}</span>
      </div>
      <div class="pokemon-image">
        <img :src="pokemon.image" />
      </div>
      <div class="pokemon-details">
        <div v-for="(type , index) in pokemon.types" :key="index" class="pokemon-type">
        {{ type.name }}
        </div>
        <div class="pokemon-weight">{{ pokemon.weight }}kg</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name:'ListaPage',
  data() {
    return {
      pokemons: [],
    };
  },
  mounted() {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=151').then((response) => {
      const promises = response.data.results.map((result) => axios.get(result.url));
      Promise.all(promises).then((responses) => {
        this.pokemons = responses.map((response) => ({
          id: response.data.id,
          name: response.data.name,
          image: response.data.sprites.front_default,
          types: response.data.types,
          weight: response.data.weight / 10,
        }));
      });
    });
  },
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


.pokemon {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  height: 250px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  padding: 1rem;
  transition: box-shadow 0.2s ease-in-out;
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

</style>