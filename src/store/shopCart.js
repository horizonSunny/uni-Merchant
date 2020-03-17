import { shopCart } from '@/service/index'
const shopCartModule = {
  state: {
    shopCartInfo: []
  },
  getters: {},
  mutations: {
    SET_SHOPCART: (state, data) => {
      console.log('SET_SHOPCART_', data)
      state.shopCartInfo = data
    }
  },
  actions: {
    GetShopCartInfo({ commit, getters }) {
      return shopCart().then(res => {
        commit('SET_SHOPCART', res.data)
        return res.data
      })
    }
  }
}
export default shopCartModule
