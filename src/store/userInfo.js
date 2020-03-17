import { getUserInfo } from '@/service/index'
const userModule = {
  state: {
    userInfo: {}
  },
  getters: {},
  mutations: {
    SET_USER: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  actions: {
    GetUserInfo({ commit }, params) {
      return getUserInfo(params).then(res => {
        commit('SET_USER', res.data)
        return res.data
      })
    }
  }
}
export default userModule
