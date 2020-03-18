import { getUserInfo, productVisit } from '@/service/index'
const userModule = {
  state: {
    userInfo: {},
    productVisit: []
  },
  getters: {},
  mutations: {
    SET_USER: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_PRODUCT_VISIT: (state, productVisit) => {
      state.productVisit = productVisit
    }
  },
  actions: {
    GetUserInfo({ commit }, params) {
      return getUserInfo(params).then(res => {
        commit('SET_USER', res.data)
        return res.data
      })
    },
    ProductVisit({ commit }, params) {
      return productVisit(params).then(res => {
        commit('SET_PRODUCT_VISIT', res.data)
        return res.data
      })
    }
  }
}
export default userModule
