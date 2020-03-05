import Vue from 'vue'
import Vuex from 'vuex'
import user from './userInfo'
import business from './businessInfo'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentTabBar: ''
  },
  mutations: {
    // 设置当前tabBar位置
    SET_CURRENT_BAR: (state, currentIndex) => {
      state.currentTabBar = currentIndex
    }
  },
  modules: {
    user,
    business
  },
  getters
})

export default store
