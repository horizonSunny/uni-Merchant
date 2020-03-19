import { getUserInfo, productVisit, medicineMan } from '@/service/index'
const userModule = {
  state: {
    userInfo: {},
    productVisit: [],
    // 用药人信息数组
    medicineMan: []
  },
  getters: {},
  mutations: {
    SET_USER: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_PRODUCT_VISIT: (state, productVisit) => {
      state.productVisit = productVisit
    },
    SET_MEDICINE_MAN: (state, medicineMan) => {
      state.medicineMan = medicineMan
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
    },
    // 获取用药人信息
    GetMedicineMan({ commit }, params) {
      return medicineMan(params).then(res => {
        commit('SET_MEDICINE_MAN', res.data)
        return res.data
      })
    }
  }
}
export default userModule
