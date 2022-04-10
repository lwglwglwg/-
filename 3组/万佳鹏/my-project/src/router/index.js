import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/page',
    name: 'page',
    component: () => import(/* webpackChunkName: "about" */ '../views/page.vue'),
    redirect:"/home",
    children:[
      {
        path:"/home",
        name:"home",
        component:()=>import ("../views/son/home")
      },
      {
        path:"/users",
        name:"users",
        component:()=>import ("../views/son/userlist")
      },
      {
        path:"/roles",
        name:"roles",
        component:()=>import ("../views/son/roles")
      },
      {
        path:"/rights",
        name:"rights",
        component:()=>import ("../views/son/rights")
      },
      {
        path:"/goods",
        name:"goods",
        component:()=>import ("../views/son/goods")
      },
      {
        path:"/addgoods",
        name:"addgoods",
        component:()=>import ("../views/son/addgoods")
      },
      {
        path:"/params",
        name:"params",
        component:()=>import ("../views/son/params")
      },
      {
        path:"/categories",
        name:"categories",
        component:()=>import ("../views/son/categories")
      },
      {
        path:"/orders",
        name:"orders",
        component:()=>import ("../views/son/orders")
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
