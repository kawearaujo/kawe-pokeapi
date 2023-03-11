<template>
  <div id="app">
    
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


