<template>
  <div id="app">
    <!-- <div id="bac"></div> -->
    <!-- <img class="background" src="./assets/img/fundo2.png" alt=""> -->
    <Header /> 
    <router-view path="$router.key" />
    <Footer /> 
  </div>
</template>

<script>
import './assets/css/globals.css';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import $ from 'jquery';

import Header from './components/Header'
import Footer from './components/Footer'


export default {
  name: 'App',
  components: {
    Header,

    Footer
  }
}
</script>


<style>
#app {
    top: 0;
    left: 0;
    position: fixed;
    /* width: 100vw; */
    z-index: 0;
    background-size: contain;
    width: -webkit-fill-available;
    /* opacity: 0.3; */
    user-select: none;
    background-image: ;
    background: url("./assets/img/fundo2.png") 0 0 repeat scroll   ;
    /* background-image: ; */
}
</style>