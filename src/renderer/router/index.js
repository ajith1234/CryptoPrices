import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/home',
            name: 'home',
            meta: { authRequired: true },
            component: require('@/components/Home').default
        },
        {
            path: '/settings',
            name: 'settings',
            meta: { authRequired: true },
            component: require('@/components/Settings').default
        },
        {
            path: '/login',
            name: 'login',
            component: require('@/components/Login').default
        },
        {
            path: '/signup',
            name: 'signup',
            component: require('@/components/SignUp').default
        },
        {
            path: '*',
            redirect: '/signup'
        }
    ],

})