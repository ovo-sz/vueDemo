import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import './utils/validate'   //*读取input验证模块
import './mock/mockServer' //读取mock模块
import CartControl from './components/CartControl/CartControl'
import Split from './components/Split/Split'
import loading from './assets/images/loading.gif'
import './filters' //加载过滤器  
// 注册商品的加减全局组件
Vue.component('CartControl', CartControl)

// 注册分隔线条的全局组件
Vue.component('Split', Split)

// 配置图片懒加载插件 内部定义全局指令
Vue.use(VueLazyload, {
  loading: loading
})


// Vue.prototype.$eventBus = new Vue() //事件总线注册
Vue.config.productionTip = false//是否为生成环境

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app') 
