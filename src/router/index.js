import Vue from 'vue'
import VueRouter from 'vue-router'

import Clouds from '@/views/Clouds'
import Home from '@/views/Home'
import CreateClouds from '@/views/CreateClouds'
import Healers from '@/views/Healers'
import Scalers from '@/views/Scalers'
import Silencers from '@/views/Silencers'
import Login from '@/views/Login'
import NotFoundComponent from '@/views/NotFoundComponent'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/clouds',
    component: Home,
    children: [
      {
        path: '/clouds',
        name: 'clouds',
        component: Clouds,
      },
      {
        path: '/clouds/create',
        name: 'create clouds',
        component: CreateClouds,
      },
      {
        path: '/healers',
        name: 'healers',
        component: Healers,
      },
      {
        path: '/scalers',
        name: 'scalers',
        component: Scalers,
      },
      {
        path: '/silencers',
        name: 'silencers',
        component: Silencers,
      },
    ],
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guest: true
    },
  },
  {
    path: '*',
    component: NotFoundComponent,
  },

]

let router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('api-token') == null) {
      next({
        path: '/login',
        param: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
