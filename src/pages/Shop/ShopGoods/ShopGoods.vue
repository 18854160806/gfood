<!--点餐-->
<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
       <!--   current-->
          <li class="menu-item" :class="{current:index==currentIndex}" v-for="(good,index) in goods" :key="index" @click="clickMenuItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon"/>
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>

      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :Src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}} %</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="now" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
    <Food :food="food" ref="food"></Food>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  //滑动组件better-scroll
  import BScroll from 'better-scroll'
  import CartControl from "../../../components/CartControl/CartControl";
  import Food from "../../../components/Food/Food";
  import ShopCart from "../../../components/ShopCart/ShopCart";
  export default {
    data(){
      return {
        scrollY:0,//右侧滑动的y轴的坐标(滚动实时变化)
        tops:[],//所有右侧分类li的top组成的数组(列表第一次显示之后不在变化)
        food:{}//类似于详情，显示food
      }
    },
    mounted() {
      //滑动
      this.$store.dispatch('getShopGoods',()=>{//1.数据更新之后执行
        //2.列表更新显示后执行
        this.$nextTick(()=>{
          //滑动，获取y坐标，
            this._initScroll()
           //获取分类，只需要获取第一次初始化的值
            this._initTops()
        })
      })
    },
    computed: {//计算初始值，和相关数据发生了变化就回执行
      ...mapState(['goods']),
      //计算得到当前分类的下标
      currentIndex(){
        //得到条件数据
        const {scrollY,tops}=this
        //根据条件产生一个计算结果
        const index =tops.findIndex((top,index)=>{
          //当前的scrollY>=当前top&&scrollY<下一个top   2<=3<8
          return  scrollY>=top&&scrollY<tops[index+1]
        })
        return index
      }
    },
    methods:{
      //初始化滚动条
      _initScroll(){
        //1.关联滑动组件，在列表显示之后创建
        //左侧商品分类滑动
        new BScroll('.menu-wrapper',{
            click:true
        })
        //右侧商家商品列表滑动，返回之后触发滑动监听
        this.foodsScroll=new BScroll('.foods-wrapper',{
          probeType:2,//默认为0，有三个值1,2,3；1为滑动的时候派发scroll事件
          click:true
        })
        //1.给右侧列表绑定scroll监听
        this.foodsScroll.on('scroll',({x,y})=>{
          this.scrollY=Math.abs(y)
        })
        //2.给右侧列表绑定scroll结束监听
        this.foodsScroll.on('scrollEnd',({x,y})=>{
          this.scrollY=Math.abs(y)
        })
      },
      //初始化tops,右侧的
      _initTops(){
        //1.初始化tops
        const tops=[]
        let top=0
        tops.push(top)
        //2.找到所有分类的li
        const lis=this.$refs.foodsUl.getElementsByClassName('food-list-hook')
        //伪数组转为真数组，就是每个li的高度
        Array.prototype.slice.call(lis).forEach(li=>{
          top+=li.clientHeight
          tops.push(top)
        })
        //3.更新数据
        this.tops=tops
      },
      //点击分类，右侧菜单变化方法
      clickMenuItem(index){
        //console.log(index)
        //使右侧列表滑动到对应的位置
        const y=this.tops[index]
        //立即更新scrolly（点击的分类项成为当前分类）
        this.scrollY=y
        //平滑滚动右侧列表
        this.foodsScroll.scrollTo(0,-y,300)
      },
      //显示点击的food
      showFood(food){
        //设置food
        this.food=food
        //显示food组件，默认隐藏,
        // 父组件调用子组件对象的方法
        this.$refs.food.toggleShow()

      }
    },
    components:{
      Food,
      CartControl,
      ShopCart
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden

    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7

      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px

        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700

          .text
            border-none()

        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat

        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px

  .foods-wrapper
    flex: 1

    .title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid #d9dde1
      font-size: 12px
      color: rgb(147, 153, 159)
      background: #f3f5f7

    .food-item
      display: flex
      margin: 18px
      padding-bottom: 18px
      bottom-border-1px(rgba(7, 17, 27, 0.1))

      &:last-child
        border-none()
        margin-bottom: 0

      .icon
        flex: 0 0 57px
        margin-right: 10px

      .content
        flex: 1

        .name
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)

        .desc, .extra
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)

        .desc
          line-height: 12px
          margin-bottom: 8px

        .extra
          .count
            margin-right: 12px

        .price
          font-weight: 700
          line-height: 24px

          .now
            margin-right: 8px
            font-size: 14px
            color: rgb(240, 20, 20)

          .old
            text-decoration: line-through
            font-size: 10px
            color: rgb(147, 153, 159)

        .cartcontrol-wrapper
          position: absolute
          right: 0
          bottom: 12px
</style>
