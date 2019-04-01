import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import login from './components/login.vue'
import index from './components/index.vue'
import user from './components/user.vue'

const router = new VueRouter({
    routes: [
        {
            path: '/login',
            component: login
        },
        {
            path: '/index',
            component: index
        },
        {
            path: '/',
            component: index,
            children: [
                {
                    path: 'users',
                    component: user
                }
            ]
        },
    ]
})

export default router;