import { patientAddress } from '@/service/index'
const addressModule = {
  state: {
    addressInfo: []
  },
  getters: {},
  mutations: {
    SET_ADDRESS: (state, data) => {
      console.log('SET_SHOPCART_', data)
      state.addressInfo = data
    }
  },
  actions: {
    GetAddressInfo({ commit, getters }) {
      return patientAddress().then(res => {
        commit('SET_ADDRESS', res.data)
        return res.data
      })
    }
  }
}
export default addressModule
