import Vue from 'vue'
import dayjs from 'dayjs'
// import format from 'date-fns/format'
// date-fns 不知为何有问题啊啊啊啊啊
// 自定义过滤器
Vue.filter('date-format', function(value, formatStr ){
    return dayjs(value).format(formatStr||'YYYY-MM-DD HH:mm:ss')
    // return format(value,formatStr||'YYYY-MM-DD HH:mm:ss')
})