import Vue from "vue";
import VueRouter from "vue-router";

import Dashboards from "@/views/Dashboards";
import Clouds from "@/views/Clouds";
import Home from "@/views/Home";
import CreateCloud from "@/views/CreateCloud";
import Healers from "@/views/Healers";
import Scalers from "@/views/Scalers";
import Silencers from "@/views/Silencers";
import Users from "@/views/Users";
import CreateUser from "@/views/CreateUser";
import CreateHealer from "@/views/CreateHealer";
import CreateScaler from "@/views/CreateScaler";
import CreateSilencer from "@/views/CreateSilencer";
import ApplyPolicies from "@/views/ApplyPolicies";
import Login from "@/views/Login";
import Logout from "@/views/Logout";
import NotFoundComponent from "@/views/NotFoundComponent";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/clouds",
    component: Home,
    children: [
      {
        path: "/dashboards",
        name: "dashboards",
        component: Dashboards
      },
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
      },
      {
        path: "/users",
        name: "users",
        component: Users
      },
      {
        path: "/createuser",
        name: "create user",
        component: CreateUser
      },
      {
        path: "/applypolicies",
        name: "apply policies",
        component: ApplyPolicies
      },
      {
        path: "/logout",
        name: "logout",
        component: Logout
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
    if (!localStorage.getItem("authorization")) {
      next({
        path: "/login",
        param: { nextUrl: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem("authorization")) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
