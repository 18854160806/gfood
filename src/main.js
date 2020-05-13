/*
入口js
 */
import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App'
import router from './router'
import store from './store'
//引入mock.js模块 因为没有向外暴露任何东西，所以不用加from。加载mockserver即可
import  './mock/mockServer'
//引入图片懒加载,loading为引入的img图片，用于加载时候显示
import VueLazyload from 'vue-lazyload'
import loading from './common/imgs/loading.gif'

import './filters'//加载过滤器，自定义日期格式化控件

//注册全局组件标签 mint-ui
Vue.component(Button.name, Button)//<mt-button>
//图片懒加载
Vue.use(VueLazyload,{//内部自定义一个lazy
  loading//懒加载时候的效果
})

new Vue({
  el:'#app',
  render: h=>h(App),
  router,   //使用router
  store     //使用vuex
})
