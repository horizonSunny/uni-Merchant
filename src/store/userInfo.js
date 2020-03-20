import {
  getUserInfo,
  productVisit,
  medicineMan,
  userDetails,
  getStatisticData,
  productCollect
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
    statisticData: {},
    // 收藏信息
    collect: []
  },
  getters: {},
  mutations: {
    SET_USER: (state, userInfo) => {
      state.userInfo = userInfo
    },
    // 设置浏览记录
    SET_PRODUCT_VISIT: (state, productVisit) => {
      console.log('state.productVisit_', productVisit)
      let productVisitOld = state.productVisit
      if (
        productVisitOld.length !== 0 &&
        productVisit[0].dataTime ===
          productVisitOld[productVisitOld.length - 1].dataTime
      ) {
        productVisitOld[productVisitOld.length - 1]['productVisits'].push(
          ...productVisit[0]['productVisits']
        )
        productVisit.shift()
      }
      state.productVisit.push(...productVisit)

      // state.productVisit.push(...productVisit)
      console.log('state.productVisit_', state.productVisit)
    },
    CLEAR_PRODUCT_VISIT: (state, productVisit) => {
      state.productVisit = []
    },
    // 设置用药人信息
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
      state.statisticData = statisticData
    },
    //收藏夹信息
    SET_COLLECT: (state, collect) => {
      state.collect = collect
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
    // 获取历史浏览记录列表
    ProductVisit({ commit }, params) {
      return productVisit(params).then(res => {
        console.log('SET_PRODUCT_VISIT_', res.data)
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
    // 获取我的模块统计数据
    GetStatisticData({ commit }, params) {
      console.log('GetStatisticData')

      return getStatisticData(params).then(res => {
        commit('SET_STATISTICE', res.data)
        return res.data
      })
    },
    // 获取收藏
    GetProductCollect({ commit }, params) {
      console.log('GetStatisticData')

      return productCollect(params).then(res => {
        commit('SET_COLLECT', res.data)
        return res.data
      })
    }
  }
}
export default userModule
