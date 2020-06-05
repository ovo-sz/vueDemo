/* 
管理商家模块的
*/
import Vue from 'vue'
import {
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT,
  CLEAR_CART
} from "../mutation-types"

import {
  reqInfo,
  reqGoods,
  reqRatings
} from '../../api'

const state = {
  goods: [], // 商品列表
  ratings: [], // 商家评价列表
  info: {}, // 商家信息
  cartFoods: [] // 购物车food数组
}
const mutations = {
  [RECEIVE_INFO](state, { info }) {
    state.info = info
  },

  [RECEIVE_RATINGS](state, { ratings }) {
    state.ratings = ratings
  },

  [RECEIVE_GOODS](state, { goods }) {
    state.goods = goods
  },
  //添加商品countupdateFoodCount
  [ADD_FOOD_COUNT](state, food) {
    // 判断food是否拥有count属性
    if (!food.hasOwnProperty('count')) {
      // 为响应式对象添加一个属性，确保新属性也是响应式的，并且能够触发视图更新 所以要使用Vue.set
      // Vue.set设置count到food中 进行数据绑定劫持 触发试图更新 
      Vue.set(food, 'count', 1)
      // 将food添加到cartFoods中
      state.cartFoods.push(food)//第一次count为0时将food对象存入数组 1->2 2->3都是同一个food所以不添加进去
    } else {
      food.count++
      // 因为清空购物车的原因 所以加入这一条判断 
      // 且为了性能 不每次进行indexOf 加多了count的判断
      // <2的原因时 原本为0 ++后为1 小于2 然后触发一次 push food
      if (food.count < 2 && state.cartFoods.indexOf(food) == -1) {
        state.cartFoods.push(food)
      }
    }

  },
  //减少商品count 无需判断是否有count 因为 先加才有减号出现 判断都在 增加那
  [REDUCE_FOOD_COUNT](state, food) {
    if (food.count > 0) {
      food.count--
      // 如果count减为了0, 从cartFoods中删除此food对象
      if (food.count === 0) {
        delete food.count
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }//FIXME
    }
  },
  //Toggle 清除购物车
  [CLEAR_CART](state) {
    // 将所有food的count置为0
    state.cartFoods.forEach(food => food.count = 0)
    // 清除购物车中所有food
    state.cartFoods = []
  },


}
const actions = {
  // 异步获取商家信息
  async getInfo({ commit }, cb) {
    const result = await reqInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, { info })
      typeof cb == 'function' && cb()
    }
  },

  // 异步获取商家评价列表
  async getRatings({ commit }, cb) {
    const result = await reqRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, { ratings })
      typeof cb == 'function' && cb()
    }
  },

  // 异步获取商家商品列表
  async getGoods({ commit }, cb) {
    const result = await reqGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, { goods })
      typeof cb == 'function' && cb()
    }
  },
  //添加商品数量count
  updateFoodCount({ commit }, { isAdd, food }) {
    if (isAdd) {
      commit(ADD_FOOD_COUNT, food)
    } else {
      commit(REDUCE_FOOD_COUNT, food)
    }
  }
}
const getters = {
  // 总数量
  totalCount(state) { //food.count统计
    return state.cartFoods.reduce((pre, food) => pre + food.count, 0)
  },
  // 总价格
  totalPrice(state) {//food.count*food价格统计
    return state.cartFoods.reduce((pre, food) => pre + food.count * food.price, 0)
  },

  /*
  总商家评论数
   */
  totalRatingsCount(state) {
    return state.ratings.length
  },

  /*
  总商家推荐评论数
   */
  positiveRatingsCount(state) {
    return state.ratings.reduce((pre, rating) => pre + (rating.rateType === 0 ? 1 : 0), 0)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}