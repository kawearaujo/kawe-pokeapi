<template>
  <div id="app">
    
    <Header /> 
    <!-- <router-view path="$router.key" /> -->
    <Home />
    <Footer /> 
  </div>
</template>

<script>
import './styles/globals.css';

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
export default {
  name: 'App',
  components: {
    Header,
    Home,
    Footer
  }
}
</script>


