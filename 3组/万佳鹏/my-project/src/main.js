import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入字体图标
import "./assets/fonts/iconfont.css"
/* 导入echarts */
import * as echarts from 'echarts';
/* 导入过滤器 */
import * as filters from './utils/index';
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
  
import TreeTable from 'vue-table-with-tree-grid'
Vue.component('tree-table', TreeTable)


Vue.prototype.$echarts = echarts
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
