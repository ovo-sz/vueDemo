 ## 注意事项
 > 本地需要安装好mongodb服务,开启服务才能进行运行项目     2019.12.20   
 > 进入server.js 运行 yarn start 运行项目   
 > mei-le-me为开发阶段代码 生产阶段代码放在了 server的public里   
 > 下列的API为辅助作用 具体看源码内容的配置

 ## 使用到的技术栈
 >前端数据处理/交互/组件化
 1.vue全家桶(vuex+vue+vueRouter) + VueCli3
 2.ES6+Axios+Webpack以及模块化组件化
 3.使用到了vant框架

  >前后端交互   
  1.mockJs mock数据处理一些图标和固定的  
  2.postman测试后端接口,由mongoose来模拟后端;  
  3.axios封装接口  

  >css预处理器
  stylus

  ## 主要功能
  1.token登陆请求  (axios请求拦截 + vuex )  
  2.分类栏与列表的交互 (better-scroll)  
  3.评论列表的切换过滤评论内容 以及切换时重新计算滚动高度  
## 1、根据经纬度获取位置详情
     
### 请求URL：
	http://localhost:5000/position/:geohash

### 示例：
[http://localhost:5000/position/40.10038,116.36867](http://localhost:5000/position/40.10038,116.36867)

### 请求方式：
	GET

### 参数类型：param

	|参数		|是否必选 |类型     |说明
	|geohash    |Y       |string   |经纬度

### 返回示例：

	{
      "code": 0,
      "data": {
        "address": "北京市昌平区337省道",
        "city": "北京市",
        "geohash": "40.10038,116.36867",
        "latitude": "40.10038",
        "longitude": "116.36867",
        "name": "昌平区北七家宏福科技园(337省道北)"
      
