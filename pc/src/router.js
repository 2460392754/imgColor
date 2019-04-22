import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '*',
            name: 'boot',
            component: () => import('./views/Boot')
        },
        {
            path: '/mainColor',
            name: 'mainColor',
            component: () => import('./views/MainColor')
        },
        {
            path: '/ascii',
            name: 'ascii',
            component: () => import('./views/Ascii')
        }
    ]
})
