import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Home from '@/pages/Home';
import Videos from '@/pages/Videos';
import Sobre from '@/pages/Sobre';
import Contato from '@/pages/Contatos';

const routes = [
    {
        path:'/', 
        component: Home
    },
    {
        path:'/videos', 
        component: Videos
    },
    {
        path:'/sobre', 
        component: Sobre
    },
    {
        path:'/contato', 
        component: Contato
    },
];

const router = new VueRouter({
    routes,
    mode:'history'
});

export default router;
