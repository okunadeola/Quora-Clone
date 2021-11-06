import { createRouter, createWebHistory } from 'vue-router'

import Register from "../components/Register";
import Login from "../components/Login";
import Home from "../components/Home";
import NotFound from "../components/NotFound";
import Quora from "../components/Quora";
import { store } from '../main'


const routes = [
  {
    path: "/",
    component: Home,
    name: "Home",

  },
  {
    path: "/Login",
    component: Login,
    name: "Login",
  },
  {
    path: "/Register",
    component: Register,
    name: "Register",
  },
  {
    path: "/Quora/:id",
    component: Quora,
    name: "Quora",
    beforeEnter: (to, from, next) => {
      if (store.state.isAuthenticated === false) {
        next("/Login")
      } else {
        next()
      }
    }
  },
  {
    path: '/:notfound(.*)',
    name: 'NotFound',
    component: NotFound

  },
];




const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
