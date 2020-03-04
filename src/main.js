import Vue from 'vue'
import App from './App'

import store from './store'
import http from './config/axios'
import { navigateTo } from './config/navTo'
import tabBar from '@/components/tab-bar'
import tobBar from '@/components/top-bar'
import bodyWrap from '@/components/body-wrap'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$http = http
Vue.prototype.$navTo = navigateTo
Vue.component('tab-bar', tabBar)
Vue.component('tob-bar', tobBar)
Vue.component('body-wrap', bodyWrap)

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
