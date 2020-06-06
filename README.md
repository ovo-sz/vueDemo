## 注意事项

> 本地需要安装好mongodb服务,开启服务才能进行运行项目
>  进入server.js 运行 yarn start 运行项目
>  clinet为开发阶段代码 生产阶段代码放在了 server的public里

## 使用到的技术栈

> 前端数据处理/交互/组件化
> 
> -   vue全家桶(vuex+vue+vueRouter) + VueCli3
>     
> -   ES6+Axios+Webpack以及模块化组件化
>     
> -   使用到了vant框架
>     

> 前后端交互
> 
> -   mockJs mock数据处理一些图标和固定的
>     
> -   postman测试后端接口,由mongoose来模拟后端; 
>   - 后端主要做了 JWT的加密和解密 以及拦截某个接口进行验证有效期
>   - 使用了svg插件 返回其url给前端,前端输入验证码后后端进行验证合格性
>     
> -   axios封装接口,拦截验证jwt的token
>     

> css预处理器
> 
> stylus
> 
> 性能优化
> 
> -   路由,组件,插件懒加载
>     
> -   vue-lazy图片懒加载
>     
> -   keep-alive
>     

## 主要功能

 > 1.token登陆请求 (axios请求拦截 + vuex )   
 > 2.分类栏与列表的交互 (better-scroll)   
 > 3.评论列表的切换过滤评论内容 以及切换时重新计算滚动高度 
