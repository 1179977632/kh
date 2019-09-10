// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'  // 引入css
import store from './store/index.js'
import Vuex from 'vuex'

Vue.config.productionTip = false

Vue.use(Mint)   // 全局使用
Vue.use(ElementUI);
Vue.use(Vuex)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
