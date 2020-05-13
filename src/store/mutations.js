/*
直接更新state的多个方法对象
 */
import Vue from 'vue'
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
}
from './mutation-types'
export default {
  /**
   * @param state
   * @param address 接收的参数对象，直接给state对象更新
   */
  [RECIEVE_ADDRESS](state,{address}){
    state.address=address
  },
  [RECIEVE_CATEGORYS](state,{categorys}){
    state.categorys=categorys
  },
  [RECIEVE_SHOPS](state,{shops}){
    state.shops=shops
  },
  [RECIEVE_USER_INFO](state,{userInfo}){
    state.userInfo=userInfo
  },
  [RESET_USER_INFO](state){
    state.userInfo= {}
  },
  //mockjs模拟数据
  [RECIEVE_GOODS](state,{goods}){
    state.goods= goods
  },
  [RECIEVE_RANTING](state,{ratings}){
    state.ratings=ratings
  },
  [RECIEVE_INFO](state,{info}){
    state.info= info
  },
  //特殊处理,字段可能不存在
  [INCREMENT_FOOD_COUNT](state,{food}){
     if(!food.count){//第一次可能会存在属性没有的情况，如果没有点击直接为1
       //food.count=1//新增数据没有数据绑定效果(数据修改也修改)
       /**给已有的对象添加属性，解决新增属性没有绑定效果
        * 对象   属性名  属性值
        */
       Vue.set(food,'count',1)//让新增的属性也有数据绑定
       //讲food添加到cartfoods(购物车)中，
       state.cartFoods.push(food)
     }else{//有的情况直接+1
       food.count++
     }
  },
  [DECREMENT_FOOD_COUNT](state,{food}){
    if(food.count){//大于0才能--
      food.count--
      if(food.count==0){
        //将food从cardfoods(购物车)中移除,购物车移除
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },
  //清空购物车
  [CLEAR_CART](state){
    //清除foods中的count
    state.cartFoods.forEach(food=>food.count=0)
    //移除购物车中所有购物项
    state.cartFoods=[]
  },
  //搜索得到的商家
  [RECIEVE_SEARCH_SHOPS](state,{searchShops}){
    state.searchShops=searchShops
  },

}

