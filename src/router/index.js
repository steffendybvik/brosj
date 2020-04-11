import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../pages/index.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/board/:boardId',
        name: 'board',
        component: () => import('../pages/board/_id')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/login')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../pages/register')
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../pages/profile')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
