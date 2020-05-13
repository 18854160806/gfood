/*
包含多个基于state的getter计算属性的对象
 */
export default {
  //统计总数量
  totalCount(state){
    return state.cartFoods.reduce((preTotal,food)=>preTotal+food.count,0)
  },
  //统计总价格
  totalPrice(state){
    return state.cartFoods.reduce((preTotal,food)=>preTotal+food.count*food.price,0)
  },
  //统计首页-商家-评价-(满意的数量)
  positiveSize(state){
    return state.ratings.reduce((preTotal,rating)=>preTotal+(rating.rateType===0?1:0),0)
  }
}

