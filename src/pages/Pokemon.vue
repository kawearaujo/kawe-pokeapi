<template>
<main>
    <img class="background" src="../assets/img/fundo2.png" alt="">
    <div class="body">
        <!-- <h1>Pokedex - PokeAPI</h1> -->
        <div class="center"><img id="pokedex" alt="logo" src="./../assets/img/pokedex_logo.png"></div>
        <!-- <label for="search">Buscar:</label> -->
        <input id="search" v-model="searchTerm" placeholder=" Nome ou Número do pokemon" :class="textoincorreto" />
        <!-- {{ capitalizeFirstLetter(pokemon.name) }} -->
        <div  v-if="pokemon" class="boxPokemon" ref="pokemon" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Tooltip on right">
            <div class="wrapPokemon" :class="backgroundImage">
                <h2 class="pokemon-number">#{{ pokemon.number }} </h2>
                <!-- <p>Number: {{ pokemon.id }}</p> -->
                <img :src="pokemon.gif" class="poke" :alt="pokemon.name" />
            </div>
            <div class="description1">
                <div>
                    <h2 class="pokemon-name">{{ pokemon.name }}</h2>
                </div>
                <div>
                    <p class="pokemon-types">
                        <span class="tipo" :class="type" v-for="(type) in pokemon.types" :key="type">
                            {{type}}
                        </span>
                    </p>
                </div>
                <!-- <div v-if="pokemon.tipo2">
                    <h3>Tipos:</h3>
                    <h4>{{ pokemon.tipo1 }} - {{ pokemon.tipo2 }}</h4>
                </div>
                <div v-else>
                    <h3>Tipos:</h3>
                    <h4>{{ pokemon.tipo1 }}</h4>
                </div> -->
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
// import '../styles/pokemon.css';
export default {
    name: 'PokemonPage',
    data() {
        return {
            // nome:'Pokemon',
            // searchQuery:'',
            // pokemons:[],
            searchTerm: "",
            pokemon: null,
            pokemonType1: '',
            pokemonType2: '',
            backgroundImage: '',
            timer: null,
            timer2: null,
            textoincorreto: '',
        }
    },
    created(){
        // $('[data-bs-toggle="tooltip"]').tooltip()
        const tooltip = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        tooltip.toggle();

        
    },
    mounted() {
        const tooltip = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        tooltip.toggle();

        

        this.$nextTick(() => {
            this.$el.querySelector('input').focus()
        })
    },

    methods: {
        async search() {
            if (!this.searchTerm) {
                this.pokemon = null;
                return;
            }
            if (this.searchTerm.trim()) {
                try {
                    const response = await axios.get(
                        `https://pokeapi.co/api/v2/pokemon/${this.searchTerm.toLowerCase()}`
                    );
                    const data = response.data;
                    if (data.types[1]) {
                        this.pokemon = {
                            name: data.name,
                            id: data.id,
                            number: response.data.id.toString().padStart(3, '0'),
                            gif: response.data.sprites.other['official-artwork']['front_default'],
                            tipo1: data.types[0].type.name,
                            tipo2: data.types[1].type.name,
                            types: response.data.types.map(type => type.type.name),
                        };
                        this.pokemonType2 = response.data.types[1].type.name;
                    } else {
                        this.pokemon = {
                            name: data.name,
                            id: data.id,
                            number: response.data.id.toString().padStart(3, '0'),
                            gif: response.data.sprites.other['official-artwork']['front_default'],
                            tipo1: data.types[0].type.name,
                            types: response.data.types.map(type => type.type.name),
                        };
                    }
                    this.pokemonType1 = response.data.types[0].type.name;

                    this.backgroundImage = `${this.pokemonType1}`;
                    this.textoincorreto = 'valid'
                    // console.log(this.backgroundImage);
                } catch (error) {
                    console.error(error);
                    this.pokemon = null;
                    this.textoincorreto = 'invalid'
                    clearTimeout(this.timer2)
                    this.timer2 = setTimeout(() => {
                        this.textoincorreto = ''
                    }, 400)

                }
            }
        },
        debouncedSearchPokemon() {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.search()
            }, 400)
        },
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.substring(1);
        },
    },

    watch: {
        searchTerm() {
            this.debouncedSearchPokemon()
        },
    },

}
</script>

<style type="stylesheet" src="../assets/css/pokemon.css" scoped></style>
