<template>
    <header>
        <nav class="container">
            <a href="/">
                <img id="logo" alt="logo" src="./../assets/img/logo.png">
                <img id="pokedex" alt="logo" src="./../assets/img/pokedex_logo.png">
            </a>
            <img v-on:click="openMenu" id="menu-button" alt="Abrir menu" src="https://raw.githubusercontent.com/william-costa/wdev-mock-site-resources/master/assets/images/menu.svg">
            <div v-on:click="closeMenu" id="menu-overlay" v-if="menuActive"></div>
            <div id="menu-items" :class="{active:menuActive}">
                <img id="menu-logo1" alt="logo" src="./../assets/img/logo.png">
                <img id="menu-logo" alt="menu-logo" src="./../assets/img/pokedex_logo.png">
                <ul>
                    <li v-on:click="closeMenu"><router-link to="/">Buscador</router-link></li>
                    <li v-on:click="closeMenu"><router-link to="/lista">Lista</router-link></li>
                    <li v-on:click="closeMenu"><router-link to="/sobre">Sobre</router-link></li>
                    <!-- <li v-on:click="closeMenu"><router-link to="/contato">Contato</router-link></li> -->
                </ul>
            </div>
        </nav>
    </header>
</template>
    
<script>
export default{
    name:'HeaderBar',
    data(){
        return{
            menuActive: false
        }
    },
    methods:{
        openMenu: function(){
            this.menuActive = true
        },
        closeMenu: function(){
            this.menuActive = false
        }
    }
}
</script>

<style scoped>

header{
    background-color: var(--color-background-nav);
    width: 100%;
    height: 10vh; 
    display: flex;
    justify-content: center;
    align-items: center;
}
#logo{
    width: 50px;
}
#pokedex{
    width: 150px;
}
#menu-button{
    width: 30px;
}
nav{
    display: flex;
    justify-content: space-between;
    height: 60px;
    align-items: center;;
}
#menu-overlay{
    position: fixed;
    top:0;
    left: 0;
    width: 40%;
    height: 100vh;
    background-color: #000;
    opacity: 0.8;
}
#menu-logo{
    width: 110px;
    
}
#menu-logo1{
    margin-top: 18px;
    width: 50px;
}
#menu-items{
    position: fixed;
    top: 0;
    right: 0;
    background-color:var(--color-background-nav) ;
    width: 60%;
    height: 100vh;
    display: none;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

#menu-items.active{
    display: flex;
}

ul{
    list-style: none;
    text-align: center;
}
ul li{
    margin:20px 0px;
}

ul li a{
    color: var(--color-text-light);
}

@media (min-width:700px) {
    #menu-button,
    #menu-logo1,
    #menu-logo,
    #menu-overlay{
        display: none;
    }
    #menu-items{
        display: flex;
        position: static;
        height: 60px;
        width: auto;
    }
    ul{
        display: flex;
        height: 60px;
        align-items: center;
    }
    ul li{
        margin: 0;
        margin-left: 20px;
    }
}
</style>