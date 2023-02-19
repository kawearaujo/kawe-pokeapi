<template>
    <main>
        <div class="body">
            <h1>Pokedex - PokeAPI</h1>
            <!-- <label for="search">Buscar:</label> -->
            <input id="search" v-model="searchTerm"  placeholder=" Nome ou Número do pokemon"/>
            <div class="wrapPokemon" v-if="pokemon" :class="backgroundImage">
                <h2 >#{{ pokemon.id }} {{ pokemon.name }}</h2>
                <!-- <p>Number: {{ pokemon.id }}</p> -->
                <img :src="pokemon.gif" :alt="pokemon.name" />
                <div v-if="pokemon.tipo2">
                    <h3>Tipos:</h3>
                    <h4 >{{ pokemon.tipo1 }} - {{ pokemon.tipo2 }}</h4>
                </div>
                <div v-else>
                    <h3>Tipos:</h3>
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
            backgroundImage: '',
            timer:null,
        }
    },
    mounted() {
    this.$nextTick(() => {
      this.$el.querySelector('input').focus()
    })
  },
   
    methods:{
      async search() {
        if (!this.searchTerm) {
            this.pokemon = null;
            return;
        }
        if (this.searchTerm.trim()) {
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
                
                this.backgroundImage = `${this.pokemonType1}`;
                // console.log(this.backgroundImage);
            } catch (error) {
                console.error(error);
                this.pokemon = null;
            }
    }
      
    },
    debouncedSearchPokemon() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
        this.search()
        }, 400)
    },
        
    },
    watch: {
        searchTerm() {
            this.debouncedSearchPokemon()
        },
    },

}
</script>

<style scoped>
   main{
    background: linear-gradient(90deg, #d7f6fc, #ebffff);
        animation: anim 2.5s infinite ease-in-out;
        background-size: 400% 400%;
        /* background-color: var(--color-background-home); */
        /* justify-content: center; */
        align-items: center;
        /* padding-top:40px; */
        /* maxheight; */
        display: flex;
        min-height: 82vh;
        align-items: center;
        justify-content:space-around;
        
    }
    input{
        caret-color: red;
        caret-shape:underscore;
        min-width: 250px;
        height: 30px;
        border-radius: 50px;
        text-align: center;
    }
    .body{
        display: flex;
        flex-direction: column;
        justify-items: center;
        gap: 15px;
    }
    .text-top{
        color: var(--color-text-light);
        font-size: 22px;
        /* margin-bottom: 20px; */
    }
    #subscribe{
        width: 340px;
    }
    .text-bottom{
        color: var(--color-text-light);
        font-size: 18px;
        /* margin-top: 20px; */
    }
    label {
        color: var(--color-text-light);
        font-size: 18px;
    }
    
    .wrapCard{
        display: flex;
        height: 250px;
        /* padding-top: 10px; */
        /* margin-top:20px ; */
        justify-content: center;
        align-items: center;
        /* background-color: rgb(183, 164, 207); */
        background: linear-gradient(90deg, #60e2ff, #6fe79f);
        animation: anim 2.5s infinite ease-in-out;
        background-size: 400% 400%;
        border-radius: 10px;
        
    }
    .wrapPokemon {
        /* margin-top:20px ; */
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        height: 250px;
        background-color: #ebf1f3;
        border-radius: 8px;
        box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.1);
        /* margin-bottom: 2rem;  */
        /* padding: 1rem; */
        transition: box-shadow 0.2s ease-in-out;
    }
    .wrapPokemon h2{
        text-justify: distribute;
    }

    .wrapPokemon:hover {
        box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
    }
   
    .fire{
        background-image: url("../assets/img/fire.png");
        background-size: contain;
    }
    .water{
        background-image: url("../assets/img/water.png");
        background-size: contain;
    }
    .normal{
        background-image: url("../assets/img/normal.png");
        background-size: contain;
    }
    .eletric{
        background-image: url("../assets/img/normal.png");
        background-size: contain;
    }
    .grass{
        background-image: url("../assets/img/leaf.png");
        background-size: contain;
    }
    .bug{
        background-image: url("../assets/img/leaf.png");
        background-size: contain;
    }
    .flying{
        background-image: url("../assets/img/flying.png");
        background-size: contain;
    }
    .ground{
        background-image: url("../assets/img/ground.png");
        background-size: contain;
    }
    .leaf{
        background-image: url("../assets/img/leaf.png");
        background-size: contain;
    }
    .psychic, .dark{
        background-image: url("../assets/img/psychic.png");
        background-size: contain;
    }
    .rock{
        background-image: url("../assets/img/rock.png");
        background-size: contain;
    }
    .ice{
        background-image: url("../assets/img/ice.png");
        background-size: contain;
    }
    .fighting, .poison, .steel, .ghost{
        background-image: url("../assets/img/normal.png");
        background-size: contain;
    }
    @media  (min-width: 700px){
        #subscribe{
            width: 370px;
        }
    }
    @keyframes anim{
        0%{
            background-position: 0 50%;
        }
        50%{
            background-position: 100% 50%;
        }
        100%{
            background-position: 0 50%;
        }

    }
</style>