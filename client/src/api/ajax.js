/* 
一个能发送ajax请求的函数
1. 统一处理请求异常 :响应拦截器 失败回调
2. 异步请求成功的数据不是response, 而是response.data :响应拦截器 成功回调
3. 对post请求参数进行ulencode处理, 而不使用默认的json方式(后台接口不支持) :请求拦截器解决
4. 配置请求超时的时间
5. 通过请求头携带token数据 
6.从vux获取token
--有添加到请求头Authorization=token
--没有,不发请求 直接进入失败流程
*/

import axios from 'axios'
import qs from 'qs'
import Vue from 'vue';
import { Notify } from 'vant';

Vue.use(Notify);

import store from '../store/index'
import router from '../router'

// 请求超时的全局配置
axios.defaults.timeout = 20000 // 20s 
// 添加请求拦截器
axios.interceptors.request.use((config) => {
  const { method, data } = config
  //method请求方式 data请求对象
  // 如果是携带数据的post请求, 进行处理
  if (method.toLowerCase() === 'post' && data && typeof data === 'object') {
    //统一进行小写处理
    // 由于后台一些接口的不支持json 转换为 ulencode 处理
    config.data = qs.stringify(data) // {name: 'tom', pwd: '123'} ==> name=tom&pwd=123
  }
  // 如果请求配置标识了需要携带token
  const { needToken } = config.headers
  if (needToken) {
    // 取出state中的token
    const token = store.state.user.token
    // 如果token有值, 添加授权的头, 值为token
    if (token) {
      // 添加到请求头 页面授权 为 -->token
      //因为后端就是在请求头的authorization 找token的 所以我们才设置在这里
      config.headers.authorization = token 
    } else {
      // 抛出异常, 直接进行错误处理流程(不发请求)
      const error = new Error('你还没有登陆,请先登录')
      error.status = 401 // 添加一个标识 为授权过期状态码 //*在响应阶段进行操作
      throw error
    }
  }
  return config; //返回请求配置对象
});





// 添加一个响应拦截器
axios.interceptors.response.use(response => {
  // 通过  返回data数据
  return response.data
}, error => {// 请求异常
  const { response, message, status } = error
  if (!response) { //请求拦截时抛出错误 没有token
    if (status === 401) {
      if (router.currentRoute.path !== '/login') {// 如果当前没在登陆界面
        router.replace('/login')
        Notify({ type: 'danger', message: message })
      } else {//已在login界面
        Notify({ type: 'warning', message: '你还没有登陆,请进行登陆' })
      }
    }
  // *发请求后的_异常_
  } else {//token有效期过期  授权过期
    const status = response.status//状态码
    // *授权过期
    const msg = message
    if (status === 401) { 
      if (router.currentRoute.path !== '/login') {
        store.dispatch('loginOut')// 退出登陆
        router.replace('/login')
        Notify({ type: 'primary', message: response.data.message })
      } else {//已在login界面
        console.log('登陆已过期, 已在login')
      }
    } else if (status === 404) {
      // token正常还不行 抛出错误
      Notify({ type: 'warning', message: '请求的资源不存在' })
    } else {
      // token正常还不行且之资源请求路径正确 抛出错误
      Notify({ type: 'danger', message: '请求异常: ' + msg })
    }
  }

  // return error
  // return Promise.reject(error)
  return new Promise(() => { })  // 中断promise链
})

export default axios  //此时的 axios是 .data的数据

