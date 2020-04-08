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
    if (getCookie("status") !== "loggedIn") {
      next({
        path: "/login",
        param: { nextUrl: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (getCookie("status") == "loggedIn") {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export default router;
