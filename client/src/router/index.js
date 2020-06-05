import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Home from '@/pages/Home/Home.vue'
const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/components/Layout/Layout.vue'),
    children: [
      {
        path: '/home',
        name: '首页',
        component: Home,
        meta: {
          showFooter: true//是否显示底部导航
        }
      },
      {
        path: '/home',
        component: () => import('@/pages/Home/Home.vue'),
        meta: {
          showFooter: true//是否显示底部导航
        }
      },
      {
        path: '/order',
        component: () => import('@/pages/Order/Order.vue'),
        meta: {
          showFooter: true
        }
      },
      {
        path: '/profile',
        name: '商品详情',
        component: () => import('@/pages/Profile/Profile.vue'),
        meta: {
          showFooter: true
        }
      },
      {
        path: '/search',
        name: '商品搜索',
        component: () => import('@/pages/Search/Search.vue'),
        meta: {
          showFooter: true
        }
      },
      {
        path: '/shop',
        name: '商品详情',
        redirect: '/shop/good',
        component: () => import('@/pages/Shop/Shop.vue'),
        children: [{
          path: '/shop/good',
          name: '商品详情',
          component: () => import('@/pages/Shop/Childrens/Good.vue'),
        }, {
          path: '/shop/info',
          name: '商品详情',
          component: () => import('@/pages/Shop/Childrens/Info.vue'),
        }, {
          path: '/shop/ratings',
          name: '商品详情',
          component: () => import('@/pages/Shop/Childrens/Ratings.vue'),
        }]
      },
    ]
  },
  {
    path: '/login',
    name: '登录',
    component: () => import('@/pages/Login/Login.vue'),
    meta: {
      nokeepAlive: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',//配置为history路由模式
  linkActiveClass: "active",
  base: process.env.BASE_URL,//模式
  routes
})

export default router
