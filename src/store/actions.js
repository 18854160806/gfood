/*
通过mutaiton间接更新state的多个方法对象
 */
import {
  RECIEVE_ADDRESS,
  RECIEVE_CATEGORYS,
  RECIEVE_SHOPS,
  RECIEVE_USER_INFO,
  RESET_USER_INFO,
  RECIEVE_GOODS,
  RECIEVE_RANTING,
  RECIEVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECIEVE_SEARCH_SHOPS
} from './mutation-types'

import {
  reqAddress,
  reqFoodTypes,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo,
  reqSearchShop
} from '../api'

export default {
  //异步获取地址的action
  async getAddress({commit, state}) {
    //发送异步ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    //提交一个mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECIEVE_ADDRESS, {address})
    }

  },
  //异步获取食品分类数组
  async getFoodTypes({commit}) {
    const result = await reqFoodTypes()
    if (result.code === 0) {
      const categorys = result.data
      commit(RECIEVE_CATEGORYS, {categorys})
    }
  },
  //异步获取商家列表
  async getShops({commit, state}) {
    const {latitude, longitude} = state
    const result = await reqShops(longitude, latitude)
    if (result.code === 0) {
      const shops = result.data
      commit(RECIEVE_SHOPS, {shops})
    }
  },
  //同步记录用户信息
  recordUser({commit}, userInfo) {
    commit(RECIEVE_USER_INFO, {userInfo})
  },
  //异步获取用户信息
  async getUserInfo({commit}) {
    const result = await reqUserInfo()
    if (result.code == 0) {
      const userInfo = result.data
      commit(RECIEVE_USER_INFO, {userInfo})
    }
  },
  //异步登出退出登录
  async logout({commit}) {
    const result = await reqLogout()
    if (result.code == 0) {
      commit(RESET_USER_INFO)
    }
  },


  //mockjs模拟数据
  // 异步获取商家商品列表
  async getShopGoods({commit},callbock) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECIEVE_GOODS, {goods}) // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
      //数据更新了，通知一下组件,可能不传递所以加个callbock&&
      callbock&&callbock()
    }
  },
  // 异步获取商家评价列表
  async getShopRatings({commit},callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECIEVE_RANTING, {ratings})
      //数据更新了，通知一下组件,可能不传递所以加个callbock&&
      callback&&callback()
    }
  },
  // 异步获取商家信息
  async getShopInfo({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECIEVE_INFO, {info})
    }
  },
  //同步(与后台不交互)更新good当中的数量，加号&&减号
  updateFoodCount({commit},{isAdd,food}){
    if(isAdd){
        commit(INCREMENT_FOOD_COUNT,{food})
    }else{
        commit(DECREMENT_FOOD_COUNT,{food})
    }
  },
  //同步清空购物车
  clearCart({commit}){
    commit(CLEAR_CART)
  },
  //搜索商家信息
  async searchShops({commit,state},keyword) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash,keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECIEVE_SEARCH_SHOPS, {searchShops})
    }
  },


}

