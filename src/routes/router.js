import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Pokemon from '@/pages/Pokemon';
import Lista from '@/pages/Lista';
import Sobre from '@/pages/Sobre';

const routes = [
    {
        path:'/', 
        component: Pokemon
    },
    {
        path:'/lista', 
        component: Lista
    },
    {
        path:'/sobre', 
        component: Sobre
    },
   
];

const router = new VueRouter({
    routes,
    mode:'history'
});

export default router;
