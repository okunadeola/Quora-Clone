import { createRouter, createWebHistory } from 'vue-router'

import Register from "../components/Register";
import Login from "../components/Login";
import Home from "../components/Home";
import Kenny from "../components/Kenny";
import Taiwo from "../components/Taiwo";
import Quora from "../components/Quora";


const routes = [
  {
    path: "/",
    component: Home,
    name: "Home",
    children: [{
      path:'/taiwo',
      component: Taiwo
    },
    {
      path:'/kenny',
      component: Kenny
    }]
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
  }
];

// const router = createRouter({
//   history:createWebHistory(),
//   routes,
// });

// const routes = [
//   {
//     path: '/',
//     name: 'App',
//     component: App
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
