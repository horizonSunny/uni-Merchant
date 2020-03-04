import Vue from 'vue'
import App from './App'

import store from './store'
import http from './config/axios'
import { navigateTo } from './config/navTo'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$http = http
Vue.prototype.$navTo = navigateTo

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
