import Vue from 'vue'
import  Moment from 'moment'

//自定义日期过滤器:名称为date-format   用到moment插件 npm install --save moment
// 在shopratings.vue里面用了    <div class="time">{{rating.rateTime|date-format}}</div>
Vue.filter('date-format',function (value,formatStr='YYYY-MM-DD HH:mm:ss') {
  return Moment(value).format(formatStr)
})
