<template>
  <div id="app">
    
    <Header /> 
    <router-view path="$router.key" />
    <Footer /> 
  </div>
</template>

<script>
import './styles/globals.css';

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


