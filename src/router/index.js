import Vue from "vue";
import VueRouter from "vue-router";

import Clouds from "@/views/Clouds";
import Home from "@/views/Home";
import CreateCloud from "@/views/CreateCloud";
import Healers from "@/views/Healers";
import Scalers from "@/views/Scalers";
import Silencers from "@/views/Silencers";
import CreateHealer from "@/views/CreateHealer";
import CreateScaler from "@/views/CreateScaler";
import CreateSilencer from "@/views/CreateSilencer";
import Login from "@/views/Login";
import NotFoundComponent from "@/views/NotFoundComponent";

import helpers from "@/plugins/helpers";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/clouds",
    component: Home,
    children: [
      {
        path: "/clouds",
        name: "clouds",
        component: Clouds
      },
      {
        path: "/createcloud",
        name: "create cloud",
        component: CreateCloud
      },
      {
        path: "/healers",
        name: "healers",
        component: Healers
      },
      {
        path: "/createhealer",
        name: "create healer",
        component: CreateHealer
      },
      {
        path: "/scalers",
        name: "scalers",
        component: Scalers
      },
      {
        path: "/createscaler",
        name: "create scalers",
        component: CreateScaler
      },
      {
        path: "/silencers",
        name: "silencers",
        component: Silencers
      },
      {
        path: "/createsilencer",
        name: "create silencer",
        component: CreateSilencer
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: "*",
    component: NotFoundComponent
  }
];

let router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!helpers.getCookie("Authorization")) {
      next({
        path: "/login",
        param: { nextUrl: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (helpers.getCookie("Authorization")) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
