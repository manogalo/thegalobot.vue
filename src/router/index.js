import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ControlPanel from '@/views/ControlPanel'
import Forbidden from '@/views/Forbidden'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/list',
        name: 'Painel de Controle',
        component: ControlPanel
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path:'/not-allowed',
        name:'403 - Forbidden',
        component: Forbidden
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router