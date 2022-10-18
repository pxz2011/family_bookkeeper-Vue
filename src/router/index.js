import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import Login from '@/views/Login'
import Register from "@/views/Register";
import HabViews from "@/views/HabViews";
import axios from "axios";



const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            requireAuth: false, // 添加该字段，表示进入这个路由是需要登录的
        },
    },
    {
        path: '/about',
        name: 'about',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },

        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView'),
    },
    {
        path: "/register",
        name: "reg",

        component: Register,
        meta: {
            requireAuth: false
        },
    },
    {
        path: '/',
        name: 'HabViews',
        component: HabViews,
        meta: {
            requireAuth: true
        }
    },
    {
       path: '/mailLogin',
       name: "mailLogin",
       component: () => import('@/views/MailLogin'),
       meta:{
	   requireAuth: false      
       }

    }


]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

export default router
