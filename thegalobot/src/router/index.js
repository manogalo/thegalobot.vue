import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BotSettings from '../views/BotSettings.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/get-started',
        name: 'Bot Settings',
        component: BotSettings
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router