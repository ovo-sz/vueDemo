const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const md5 = require('blueimp-md5')
const UserModel = require('../models/UserModel')
const ajax = require('../api/ajax')
const _filter = {'pwd': 0, '__v': 0} // 查询时过滤掉
const sms_util = require('../util/sms_util')
const users = {}
const svgCaptcha = require('svg-captcha')
const createToken = require('../token/createToken')
const checkToken = require('../token/checkToken')

const test = require('./test')
test(router)

/*
密码登陆
 */
router.post('/login_pwd', function (req, res) {
  const name = req.body.name
  const pwd = md5(req.body.pwd)
  const captcha = req.body.captcha.toLowerCase();//获取验证码
  // 可以对用户名/密码格式进行检查, 如果非法, 返回提示信息
  if (captcha !== req.session.captcha) {
    return res.send({code: 1, msg: '验证码不正确'})
  }
  // 删除保存的验证码
  delete req.session.captcha
  UserModel.findOne({name})
    .then((user) => {
      if (user) {
          res.send({
            code: 0, 
            data: {
              _id: user._id, 
              name: user.name, 
              phone: user.phone,
              token: createToken(user._id)
            }
          })
        // }
        return new Promise(() => {

        }) // 返回一个pending状态的promise对象
      } else {
        return UserModel.create({name, pwd})
      }
    })
    .then((user) => {
      const data = {
        _id: user._id,
        name: user.name,
        token: createToken(user._id)
      }
      // 3.2. 返回数据(新的user)
      res.send({code: 0, data})
    })
    .catch(error => {
      console.error('/login_pwd', error)
    })
})

/*
一次性图形验证码
 */
router.get('/captcha', function (req, res) {
  var captcha = svgCaptcha.create({
    ignoreChars: '0o1l',
    noise: 2,
    color: true
  });
  req.session.captcha = captcha.text.toLowerCase();
  console.log('注入的验证码',req.session.captcha)
  res.type('svg');
  res.send(captcha.data)
});

/*
根据经纬度获取位置详情
 */
router.get('/position/:geohash', function(req, res) {
  const {geohash} = req.params
  ajax(`http://cangdu.org:8001/v2/pois/${geohash}`)
    .then(data => {
      res.send({code: 0, data})
    })
})

router.get('/auto_login', function(req, res) {
  // 得到请求头中的token
  console.log(req,res )
  const token = req.headers['authorization']
  // 如果请求头中没有token, 直接返回
  if (!token) {
    return res.send({code: 1, msg: '请先登陆'})
  }
  // 解码token, 如果失败或过了有效期, 返回401
  const decoded = jwt.decode(token, 'secret')
  if (!decoded || decoded.exp < Date.now() / 1000) {
    res.status(401)
    return res.json({ message: 'token过期，请重新登录' })
  }
  // 根据解码出的用户id, 查询得到对应的user, 返回给客户端
  const userId = decoded.id
  UserModel.findOne({ _id: userId }, _filter)
    .then(user => {
      res.send({code: 0, data: user})
    })
})


/*
获取首页分类列表
先听过checkToken令牌验证 他里面next后才可以继续往下 请求到数据
 */
router.get('/index_category', checkToken, function(req, res) {
// router.get('/index_category', function(req, res) {
  setTimeout(function () {
    const data = require('../data/index_category.json')
    res.send({code: 0, data})
  }, 300)
})

/*
根据经纬度获取商铺列表
 */
router.get('/shops', checkToken, function(req, res) {
// router.get('/shops', function(req, res) {
  setTimeout(function () {
    const data = require('../data/shops.json')
    res.send({code: 0, data})
  }, 300)
})



/* 
router.get('/search_shops', checkToken, function(req, res) {
  const {geohash, keyword} = req.query
  ajax('http://cangdu.org:8001/v4/restaurants', {
    'extras[]': 'restaurant_activity',
    geohash,
    keyword,
    type: 'search'
  }).then(data => {
    res.send({code: 0, data})
  })
}) 
*/

module.exports = router;

