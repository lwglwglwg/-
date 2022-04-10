import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import store from "@/store"
Vue.use(VueRouter)

const routes = [
  {//登录
    path: '/login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/home',
    redirect:'/welcome',//重定向welcome
    component: () => import('@/views/home.vue'),
    children: [
      {
        path: '/welcome',//重定向
        component: () => import('../views/welcome.vue'),
      },
      {
        path: '/users',//
        component: () => import('../views/users/users'),
      },
      // 权限模块
      {
        path: '/roles',//角色
        component: () => import('../views/qx/roles'),
      },
      {
        path: '/rights',//权限
        component: () => import('../views/qx/rights'),
      },
      // 商品模块
      {
        path: '/goods',//商品列表111
        component: () => import('../views/goods/goods'),
      },
      {
        path: '/goods/add',//添加商品11
        component: () => import('../views/goods/add'),
      },
      {
        path: '/params',//分类参数
        component: () => import('../views/goods/params'),
      },
      {
        path: '/categories',//商品分类
        component: () => import('../views/goods/categories'),
      },
      // //订单管理模块
      {
        path: '/orders',//订单管理
        component: () => import('../views/orders/orders'),
      },
       // //数据统计模块
       {
        path: '/reports',//数据统计
        component: () => import('../views/reports/reports'),
      },
    ]
  },

]

const router = new VueRouter({
  routes
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
  if(to.path === '/login') { // 如果要访问登录页面
    next(); // 放行
  } else {
    // 如果sessionStorage中，存在token值，证明已经登录成功了
    if(sessionStorage.token) {//有token 即登录过了 也放行
      next(); // 放行
    } else {
      next('/login'); // 如果没有登录，跳转到登录页面
    }
  }
})
export default router
