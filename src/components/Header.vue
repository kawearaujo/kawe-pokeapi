<template>
    <header>
        <nav class="container">
            <router-link to="/" class="">
                <img id="logo" alt="logo" src="./../assets/img/logo.png">
                
            </router-link>
            
            <img v-on:click="openMenu" id="menu-button" alt="Abrir menu" src="./../assets/img/menu.svg">
            <div v-on:click="closeMenu" id="menu-overlay" v-if="menuActive"></div>
            <div id="menu-items" :class="{active:menuActive}">
                <img id="menu-logo1" alt="logo" src="./../assets/img/logo.png">
                <img id="menu-logo" alt="menu-logo" src="./../assets/img/pokedex_logo.png">
                <ul>
                    <li v-on:click="closeMenu" ><router-link to="/" class="fontHeader">Inicio</router-link></li>
                    <li v-on:click="closeMenu" ><router-link to="/lista" class="fontHeader">Lista</router-link></li>
                    <li v-on:click="closeMenu" ><router-link to="/sobre" class="fontHeader">Sobre</router-link></li>
                    <button class="darkmode" @click="toggleTheme"><img  src="./../assets/img/dark.svg" alt=""></button>
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
    mounted(){
        const meta = document.createElement('meta')
        meta.setAttribute('name', 'color-scheme')
        meta.setAttribute('content', 'light')
        document.head.appendChild(meta)
    },
    methods:{
        openMenu: function(){
            this.menuActive = true
        },
        closeMenu: function(){
            this.menuActive = false
        },
        switchTheme: function(){
            const theme= document.getElementById('theme').value;
            this.meta[0].contet=theme;
        },
        toggleTheme() {
            document.body.classList.toggle('dark')
        }
    }
}
</script>

<style scoped>
.darkmode {
    background-color: transparent;
    border:transparent;
}
.darkmode img{
    width: 30px;
}
header{
    background-color: var(--color-background-head);
    width: 100%;
    height: 6vh; 
    display: flex;
    justify-content: center;
    align-items: center;
}
#logo{
    width: 30px;
}
#pokedex{
    width: 150px;
}
#menu-button{
    width: 45px;
    
}
nav{
    display: flex;
    justify-content: space-between;
    height: 60px;
    align-items: center;
    z-index: 1;
    
}
#menu-overlay{
    position: fixed;
    top:0;
    left: 0;
    width: 40%;
    height: 100vh;
    background-color: #000;
    opacity: 0.8;
    z-index: 100;
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
    /* background-color:var(--color-background-head) ; */
    width: 60%;
    height: 100vh;
    display: none;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    
}

#menu-items.active{
    display: flex;
    z-index: 999;
    background-color: #a5a4a4;
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



.fontHeader{
  font-family: "notosans", sans-serif;
  font-size: 19pt;
  letter-spacing: 2px;
  color: rgb(98, 98, 98);
  text-decoration:solid;
  font-weight: 100;
  text-shadow: #000;
  /* font-style:oblique; */
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
 @media (width < 500px) {
    header{
        height: 5vh;
    }
    #pokedex{
        height: 4vh;
        width: auto;
        /* padding-left: 100px; */
        /* margin-top: 5px; */
        align-self: center;
        
    }
    #logo{
        height: 4vh;
        width: auto;
        margin-top: 10px;
    }
   
} 
</style>