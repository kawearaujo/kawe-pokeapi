<template>
<div v-if="isLoading" class="wraploading">
    <img class="loading" src="../assets/img/loading.svg" alt="carregamento">
</div>
<div v-else class="wrapmain">
    <img class="background" src="../assets/img/fundo2.png" alt="">
    <div class="grid">

        <div class="pokemon" v-for="pokemon in paginatedPokemons[1]" :key="pokemon.id" @click="showPokemonModal(pokemon)">

            <div class="backgroudPokemon" :class="pokemon.tipo1">
                <div class="pokemon-number">
                    <p># {{ pokemon.number }}</p>
                </div>
                <div v-if="telaDesktop()>700" class="pokemon-image">
                    <img class="poke" :style="{
                        height: pokemon.pokeh * 20 + 'px',
                        maxHeight:200 + 'px',
                        minHeight:100 + 'px',
                        position: 'absolute',
                        }" :src="pokemon.imageUrl" :alt="pokemon.name">
                    <img class="pokebg" src="../assets/img/ballbg.svg" alt="">
                </div>
                <div v-else-if="telaDesktop()>500 && telaDesktop()<700" class="pokemon-image">
                    <img class="poke" :style="{
                        height: pokemon.pokeh * 9 + 'px',
                        maxHeight:120 + 'px',
                        minHeight:70 + 'px',
                        position: 'absolute',
                        }" :src="pokemon.imageUrl" :alt="pokemon.name">
                    <img class="pokebg" src="../assets/img/ballbg.svg" alt="">
                </div>
                <div v-else-if="telaDesktop()>0 && telaDesktop()<500" class="pokemon-image">
                    <img class="poke" :style="{
                        height: pokemon.pokeh * 9 + 'px',
                        maxHeight:120 + 'px',
                        minHeight:70 + 'px',
                        position: 'absolute',
                        }" :src="pokemon.imageUrl" :alt="pokemon.name">
                    <img class="pokebg" src="../assets/img/ballbg.svg" alt="">
                </div>
            </div>
            <div class="pokemon-info">
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
            </div>
        </div>

    </div>
    <div v-if="selectedPokemon !== null" class="modalPokemon">
        <div class="modal-backdrop" v-on:click="hidePokemonModal"></div>
        <div class="modal">
            <!-- <button class="modal-close" v-on:click="hidePokemonModal">&times;</button> -->
            <div class="modal-content">
                <div class="modal-left" :class="selectedPokemon.tipo1">
                    <div>
                        <img class="pokebg" src="../assets/img/ballbg.svg" alt="">
                        <img :src="selectedPokemon.imageUrl" :alt="selectedPokemon.name">

                    </div>

                    <h2 class="modal-nome-pokemon">{{ selectedPokemon.name }}</h2>
                </div>
                <div class="modal-right">
                    <div>
                        <p class="title">Habilidades</p>
                    </div>
                    <div>
                        <ul class="detalhes">
                            <li class="detalheNome" v-for="ability in selectedPokemon.abilities" :key="ability">
                                <p class="ability" :class="selectedPokemon.tipo1">{{ ability }}</p>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p class="title">Status Basico</p>
                    </div>
                    <div class="tabela">
                        <div style="columns: 2;">
                            <div v-for="stat in selectedPokemon.stats" :key="stat">
                                <p class="td_left" style="display:flex;">{{ stat.stat.name }}</p>
                            </div>
                            <div v-for="stat in selectedPokemon.stats" :key="stat">
                                <p class="td_right" style="display:flex;text-align:left ;" :style="{width:  stat.base_stat +'px'}">{{ stat["base_stat"]}}</p>
                            </div>
                        </div>

                    </div>
                    <div>
                        <p class="title">Caracteristicas</p>
                    </div>
                    <div class="caracteristicas">
                        <p>Peso: {{ selectedPokemon.weight }} kg</p>
                        <p>Altura: {{ selectedPokemon.pokeh }} m</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div class="paginacao">
        <Paginate :list="paginatedPokemons[1]" :per="paginatedPokemons[0]" :page-count="pageCount" :displayed-pages="3" :prev-text="'Anterior'" :next-text="'Próxima'" :click-handler="changePage">

        </Paginate>

    </div>
</div>
</template>

<script>
import Paginate from 'vuejs-paginate';
// import '../styles/lista.css';
import axios from 'axios';

export default {
    name: 'ListaPage',
    components: {
        Paginate,

    },
    data() {
        return {
            pokemons: [],
            currentPage: 1,
            isLoading: true,
            per: 0,
            displayed_pages: 0,
            tipoPokemon: '',
            selectedPokemon: null,
            tamanho: 0,
            screenWidth: 0,
        };
    },
    created() {
        window.addEventListener('resize', this.handleResize);

    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    computed: {

        paginatedPokemons() {
            var start = 0;
            var end = 0;
            var number = 0;
            var vetor = [];
            const viewPort = window.innerWidth;
            if (viewPort > 700) {
                number = 8;
                start = (this.currentPage - 1) * number;
                end = start + number;
            } else if (viewPort > 500 && viewPort <= 700) {
                number = 6;
                start = (this.currentPage - 1) * number;
                end = start + number;
            } else if (viewPort > 300 && viewPort <= 500) {
                number = 6;
                start = (this.currentPage - 1) * number;
                end = start + number;
            }
            // pokemonper(number)
            vetor[0] = number;
            vetor[1] = this.pokemons.slice(start, end)
            return vetor;
        },
        pageCount() {
            var length = 0;
            const viewPort = window.innerWidth;
            if (viewPort > 700) {
                length = 8;
            } else if (viewPort > 500 && viewPort <= 700) {
                length = 6;
            } else if (viewPort > 300 && viewPort <= 500) {
                length = 6;
            }
            return Math.ceil(this.pokemons.length / length);
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
                        this.isLoading = false;
                        var tipos = response.data.types.map(type => type.type.name)
                        this.tamanho = response.data.height;

                        if (tipos[1]) {

                            return {
                                id: response.data.id,
                                name: response.data.name,
                                number: response.data.id.toString().padStart(3, '0'),
                                weight: response.data.weight / 10,
                                types: response.data.types.map(type => type.type.name),
                                tipo1: response.data.types[0].type.name,
                                tipo2: response.data.types[1].type.name,
                                imageUrl: response.data.sprites.other['official-artwork']['front_default'],
                                pokeh: response.data.height / 10,
                                abilities: response.data.abilities.map(ability => ability.ability.name),
                                stats: response.data.stats.map(stat => (stat.base_stat, stat)),

                            };
                        } else {
                            return {
                                id: response.data.id,
                                name: response.data.name,
                                number: response.data.id.toString().padStart(3, '0'),
                                weight: response.data.weight / 10,
                                types: response.data.types.map(type => type.type.name),
                                tipo1: response.data.types[0].type.name,
                                imageUrl: response.data.sprites.other['official-artwork']['front_default'],
                                pokeh: response.data.height / 10,
                                abilities: response.data.abilities.map(ability => ability.ability.name),
                                stats: response.data.stats.map(stat => (stat.base_stat, stat)),

                            };
                        }
                    });
                });

            })
            .catch(error => {
                console.error(error);
            });

    },
    methods: {
        changePage(page) {
            this.currentPage = page;
        },
        pokemonper(number) {
            this.per = number;
        },
        handleResize() {
            this.screenWidth = window.innerWidth;
        },
        telaDesktop() {
            var tela = window.innerWidth;
            // if (tela>700){
            //     return true;
            // }
            // else{
            //     return false;
            // }
            return tela;
        },
        cardDescricao() {
            alert("top");
        },
        showPokemonModal(pokemon) {
            // Quando um Pokemon é clicado, armazene seus dados em selectedPokemon
            this.selectedPokemon = pokemon;
        },

        hidePokemonModal() {
            // Quando o botão "Voltar" é clicado, esconda o modal definindo selectedPokemon para null
            this.selectedPokemon = null;
        },

    }
};
</script>
<style type="stylesheet" src="../assets/css/lista.css" scoped></style>

