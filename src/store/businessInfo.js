import { getClassify, getMainInfo, searchKeyword } from '@/service/index'
const businessModule = {
  state: {
    // 找药/分类数据
    classifyInfo: [],
    // 获取main主页信息后，分成四类信息，商户信息，轮播图信息，快速分类信息，商家推荐商品信息
    tenant: {},
    banners: [],
    quickCategorys: [],
    products: [],
    // 获取搜索词库
    searchKeyword: []
  },
  getters: {
    // getPermission(state, getters, rootState, rootGetters) {
    //   // console.log('rootGetters_', rootGetters)
    //   return rootGetters.permissions;
    // }
  },
  mutations: {
    SET_ClASSIFY: (state, classify) => {
      state.classifyInfo = classify
    },
    SET_MAIN: (state, mainInfo) => {
      console.log('mainInfo_', mainInfo)
      state.tenant = mainInfo.tenant
      state.banners = mainInfo.banners
      state.quickCategorys = mainInfo.quickCategorys
      state.products = mainInfo.products
    },
    SET_SEARCH_KEY: (state, keyword) => {
      state.searchKeyword = keyword
    }
  },
  actions: {
    GetClassify({ commit, getters }) {
      return getClassify().then(res => {
        commit('SET_ClASSIFY', res.data)
        return res.data
      })
    },
    // 获取主页信息数据
    GetMainInfo({ commit }) {
      return getMainInfo().then(res => {
        // commit('SET_ClASSIFY', res.data)
        commit('SET_MAIN', res.data)
        return res.data
      })
    },
    // 获取搜索词库
    GetKeyWord({ commit }) {
      searchKeyword().then(res => {
        commit('SET_SEARCH_KEY', res.data)
      })
    }
  }
}
export default businessModule
