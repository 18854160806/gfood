<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import FooterGuide from "./components/FooterGuide/FooterGuide";
    export default {
    //会出现跨域情况，需要配置config/index.js  中的proxyTable属性内容
 /*直接测试api接口使用
 import {reqFoodTypes} from './api'
      async mounted() {
        const result=await reqFoodTypes()
        console.log(result)
      },*/
      mounted() {
        //调用action的名称
        //this.$store.dispatch('getAddress')
        this.getAddress()
        this.getUserInfo()
      },
      methods:{
        ...mapActions(['getAddress','getUserInfo'])
      },
      components:{
        FooterGuide
      }
    }

</script>

<style  lang="stylus" rel="stylesheet/stylus">
  .app
    width 100%
    height 100%
    background #f5f5f5
</style>
