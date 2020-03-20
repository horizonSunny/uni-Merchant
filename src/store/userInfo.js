import {
  getUserInfo,
  productVisit,
  medicineMan,
  userDetails,
  getStatisticData
} from '@/service/index'
const userModule = {
  state: {
    userInfo: {},
    productVisit: [],
    // 用药人信息数组
    medicineMan: [],
    // 当前编辑用药人
    currentMedicineMan: '',
    userDetails: {},
    statisticData: {}
  },
  getters: {},
  mutations: {
    SET_USER: (state, userInfo) => {
      state.userInfo = userInfo
    },
    // 设置浏览记录
    SET_PRODUCT_VISIT: (state, productVisit) => {
      state.productVisit.concat(productVisit)
    },
    SET_MEDICINE_MAN: (state, medicineMan) => {
      state.medicineMan = medicineMan
    },
    SET_CURRENT_MEDICINE_MAN: (state, medicineMan) => {
      console.log('SET_CURRENT_MEDICINE_MAN_', medicineMan)
      state.currentMedicineMan = medicineMan
    },
    SET_USER_DETAILS: (state, userInfo) => {
      console.log('SET_USERINFO', userInfo)
      state.userDetails = userInfo
    },
    SET_STATISTICE: (state, statisticData) => {
      console.log('SET_STATISTICE', statisticData)
      state.statisticData = statisticData
    }
  },
  actions: {
    // 获取用户信息
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
    // 获取用药人信息列表
    GetMedicineMan({ commit }, params) {
      return medicineMan(params).then(res => {
        commit('SET_MEDICINE_MAN', res.data)
        return res.data
      })
    },
    // 获取用户详细信息
    GetUserDetails({ commit }, params) {
      return userDetails(params).then(res => {
        commit('SET_USER_DETAILS', res.data)
        return res.data
      })
    },
    // 获取统计数据
    GetStatisticData({ commit }, params) {
      console.log('GetStatisticData')

      return getStatisticData(params).then(res => {
        commit('SET_STATISTICE', res.data)
        return res.data
      })
    }
  }
}
export default userModule
