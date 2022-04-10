import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 树状表格
import ZkTable from 'vue-table-with-tree-grid'

// 段点隐藏
// import 'element-ui/lib/theme-chalk/display.css';
// element.js
// import '@/plugins/element.js'
// 移动端适配
import 'lib-flexible/flexible';
// 阿里图标
import './assets/fonts/iconfont.css'

//2.main中  echarts
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts

// import axios from "axios"
Vue.config.productionTip = false

Vue.prototype.$axios = axios

//过滤时间
Vue.filter("Format",(val)=>{
   let date=new Date(val)
   let y =date.getFullYear()
   let m =(date.getMonth()+1+'').padStart(2,'0')
   let d =(date.getDate()+'').padStart(2,'0')  
   let h = (date.getHours()+'').padStart(2,'0')
   let f = (date.getMinutes()+'').padStart(2,'0')
   let s= (date.getSeconds()+'').padStart(2,'0')
  return `${y}-${m}-${d} ${h}:${f}:${s}`
})

Vue.component('zk-table', ZkTable)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')