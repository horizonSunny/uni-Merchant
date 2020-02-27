import { getUserInfo } from '@/service/index'
const userModule = {
  state: {
    phone: '',
    userInfo: {}
  },
  getters: {},
  mutations: {
    SET_USER: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_PHONE: (state, payload) => {
      console.log('SET_PHONE_', payload)
      state.phone = payload.phone
    }
  },
  actions: {
    GetUserInfo({ commit }) {
      return getUserInfo().then(res => {
        // commit('SET_ClASSIFY', res.data)
        commit('SET_USER', res.data)
        return res.data
      })
    }
  }
}
export default userModule
