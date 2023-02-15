<template>
    <!-- <div class="text-top">
        <input type="search">
    </div>
        <img src="" alt="">
    <div class="text-bottom">Youtube</div> -->
    <main>
        <div >
            <h1>Pokedex - PokeAPI</h1>
            <label for="search">Buscar:</label>
            <input id="search" v-model="searchTerm" @input="search" />
            <br>
            <div class="wrapPokemon" v-if="pokemon" >
                <h2 >{{ pokemon.id }} - {{ pokemon.name }}</h2>
                <!-- <p>Number: {{ pokemon.id }}</p> -->
                <img :src="pokemon.gif" :alt="pokemon.name" />
                <h3>Tipos:</h3>
                <div v-if="pokemon.tipo2">
                    <h4 >{{ pokemon.tipo1 }} - {{ pokemon.tipo2 }}</h4>
                </div>
                <div v-else>
                    <h4 >{{ pokemon.tipo1 }}</h4>
                </div>
            </div>
            <div class="wrapCard" v-else>
                <img class="card" src="../assets/img/cardSeach.png">
            </div>
        </div>

    </main>
</template>

<script>
import axios from 'axios';

export default{
    name:'PokemonPage',
    data(){
        return{
            // nome:'Pokemon',
            // searchQuery:'',
            // pokemons:[],
            searchTerm: "",
            pokemon: null,
            pokemonType1: '',
            pokemonType2: '',
            backgroundImage: ''
        }
    },
   
    methods:{
                async search() {
      if (!this.searchTerm) {
        this.pokemon = null;
        return;
      }
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${this.searchTerm}`
        );
        const data = response.data;
        if(data.types[1]){
            this.pokemon = {
            name: data.name,
            id: data.id,
            gif: data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'],
            tipo1: data.types[0].type.name,
            tipo2: data.types[1].type.name
            };
            this.pokemonType2 = response.data.types[1].type.name;
        }else{
            this.pokemon = {
            name: data.name,
            id: data.id,
            gif: data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'],
            tipo1: data.types[0].type.name
            };
        }
        this.pokemonType1 = response.data.types[0].type.name;
        
        this.backgroundImage = `background-image: url("../assets/arenaBg/${this.pokemonType}.png");`;
        console.log(this.backgroundImage);
      } catch (error) {
        console.error(error);
        this.pokemon = null;
      }
    },

        
    }

}
</script>

<style scoped>
   main{
        background-color: var(--color-background-home);
        /* justify-content: center; */
        align-items: center;
        padding-top:40px;
    }
    .text-top{
        color: var(--color-text-light);
        font-size: 22px;
        margin-bottom: 20px;
    }
    #subscribe{
        width: 340px;
    }
    .text-bottom{
        color: var(--color-text-light);
        font-size: 18px;
        margin-top: 20px;
    }
    label {
        color: var(--color-text-light);
        font-size: 18px;
    }
    .wrapCard{
        display: flex;
        height: 250px;
        margin-top:20px ;
        justify-content: center;
        align-items: center;
        background-color: rgb(183, 164, 207);
        /* background-color: src("../assets/img/cardSeach.png"); */
        /* background-image: image("../assets/arenaBg/ice.png");  */
        
    }
    .wrapPokemon {
        display: flex;
        min-height: 250px;
        /* margin-top:20px ;
        padding-top: 20px; */
        flex-direction: column;
        /* justify-content: center; */
        justify-content: space-around;
        align-items: center;
        background-color: rgb(205, 203, 207);
    }
   
    @media  (min-width: 700px){
        #subscribe{
            width: 370px;
        }
    }
</style>