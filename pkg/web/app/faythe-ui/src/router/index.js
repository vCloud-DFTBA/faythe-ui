import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/clouds',
  },
  {
    path: '/clouds',
    name: 'clouds',
    component: () => import('@/views/Clouds.vue')
  },
  {
    path: '/clouds/create',
    name: 'create clouds',
    component: () => import('@/views/CreateClouds.vue')
  },
  {
    path: '/healers',
    name: 'healers',
    component: () => import('@/views/Healers.vue')
  },
  {
    path: '/scalers',
    name: 'scalers',
    component: () => import('@/views/Scalers.vue')
  },
  {
    path: '/silencers',
    name: 'silencers',
    component: () => import('@/views/Silencers.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
