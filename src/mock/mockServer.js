/*
使用mockjs提供数据接口，npm install --save mockjs
 */
import Mock from 'mockjs'
import data from './data.json'

//返回goods接口  食品    "price|10-20": 20，  修改语法
Mock.mock('/goods',{code:0,data:data.goods})
//返回rating接口  评价
Mock.mock('/rating',{code:0,data:data.ratings})
//返回info的接口  商家信息
Mock.mock('/info',{code:0,data:data.info})

//export default  ??? 不需要暴露任何数据，只需要保证能执行即可
