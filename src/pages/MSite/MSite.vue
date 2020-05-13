<template>
  <section class="msite">
    <!--首页头部  用到了slot插槽-->
<!--    <header class="header">
          <span class="header_search">
            <i class="iconfont icon-sousuo"></i>
          </span>
      <span class="header_title">
            <span class="header_title_text ellipsis">昌平区北七家宏福科技园(337省道北)</span>
          </span>
      <span class="header_login">
            <span class="header_login_text">登录|注册</span>
          </span>
    </header>-->

    <HeaderTop :title="address.name">
       <router-link class="header_search" slot="left" to="/search">
            <i class="iconfont icon-sousuo"></i>
       </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id ? '/userinfo':'/login'">
        <span class="header_login_text" v-if="!userInfo._id">
            登录|注册
        </span>
        <span class="header_login_text" v-else>
            <i class="iconfont icon-person"></i>
        </span>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container"  v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImageUrl+category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
  </section>
</template>

<script>
  import {mapState} from 'vuex'
  import Swiper from 'swiper'
  import 'swiper/css/swiper.min.css'

  import HeaderTop from "../../components/HeaderTop/HeaderTop";
  import ShopList from "../../components/ShopList/ShopList";
    export default {

      data(){
        return {
          baseImageUrl:'https://fuss10.elemecdn.com'
        }
      },
    mounted() {
        //获取食品分类
      this.$store.dispatch('getFoodTypes')
      //获取商家列表
      this.$store.dispatch('getShops')
    },
      components:{
        HeaderTop,
        ShopList
      },
      //监视列表，为了解决轮播问题，轮播必须数据创建之后才双肩swiper组件好用
      watch:{
        categorys(value){//categorys中有数据了，必须在在异步更新界面之后执行
      /*    //使用settime可以实现效果，但是不合适
          setTimeout(()=>{
            //创建一个swiper对象实例，来实现轮播,数组数据显示之后才能创建此控件
            new Swiper('.swiper-container',{
              loop:true,// 循环轮播
              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
              },

            })
          },100)*/
          //界面更新立即创建swiper对象,此条语句一定写在数据更新之后
          this.$nextTick(()=>{//一旦完成页面更新立即调用
            //创建一个swiper对象实例，来实现轮播,数组数据显示之后才能创建此控件
            new Swiper('.swiper-container',{
              loop:true,// 循环轮播
              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
              },
            })
          })
        }
      },
      computed:{//vuex当中取出state
          ...mapState(['address','categorys','userInfo']),
        /**
         * 根据categorys一位数组生成一个二维数组，小数组中的元素个数最大是8个
         */
        categorysArr(){
          const {categorys}=this
          //准备空的二维数组
          const arr=[]
          //准备小数组用来保存分类(最大长度为8)
          let minArr=[]
          //遍历
          categorys.forEach(c=>{
            //小数组元素已经满8个，从新创建小数组
            if(minArr.length===8){
              minArr=[]
            }
            //如果小数组==0，那么就添加到大数组
            if(minArr.length===0){
              arr.push(minArr)
            }
            //把当前分类保存到小数组当中去
            minArr.push(c)
          })
          return arr
        }
      }
    }
</script>

<style  lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%

    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>
