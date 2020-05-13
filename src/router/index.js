/*
路由器组件
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

/*import MSite from "../pages/MSite/MSite";
import Order from "../pages/Order/Order";
import Search from "../pages/Search/Search";
import Profile from "../pages/Profile/Profile";*/
//文件的懒加载，不执行函数不会加载，都是返回函数，只有第一次得时候会执行，生成js之后不会重复执行,F12  -->source能看到
const MSite=()=>import('../pages/MSite/MSite')
const Order=()=>import('../pages/Order/Order')
const Search=()=>import('../pages/Search/Search')
const Profile=()=>import('../pages/Profile/Profile')


import Login from "../pages/Login/Login";
import Shop from "../pages/Shop/Shop";
import ShopGoods from "../pages/Shop/ShopGoods/ShopGoods";
import ShopRating from "../pages/Shop/ShopRating/ShopRating";
import ShopInfo from "../pages/Shop/ShopInfo/ShopInfo";
Vue.use(VueRouter)

export default new VueRouter({
  routes:[
    {
      path:'/msite',
      component:MSite,//返回路由组建的函数，第一次，只有执行此函数才会加载路由组建,这个函数在请求对应的路径的时候才会执行
      meta:{
        showFooter:true
      }
    },
    {
      path:'/search',
      component:Search,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/order',
      component:Order,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/profile',
      component:Profile,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/login',
      component:Login,
      /*meta:{默认是空，点出来是false，所以不用配置
        showFooter:true
      }*/

    },
    {
      path:'/shop',
      component:Shop,
      children:[
        {
          path:'/shop/goods',
          component:ShopGoods
        },
        {
          path:'/shop/rating',
          component:ShopRating
        },
        {
          path:'/shop/info',
          component:ShopInfo
        },
        {
          path:'',
          redirect:'/shop/goods'
        },
      ]
    },
    {
      path: '/',
      redirect:'/msite'
    }
  ]
})
