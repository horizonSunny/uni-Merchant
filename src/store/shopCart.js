import { shopCart } from '@/service/index'
const shopCartModule = {
  state: {
    shopCartInfo: [],
    // 由购物车或者立即购买生成的订单信息
    newIndent: ''
  },
  getters: {},
  mutations: {
    SET_SHOPCART: (state, data) => {
      state.shopCartInfo = data
    },
    // 代表订单里面的初始信息,可能由购物车来，也可能是立即购买
    NEW_INDENT: (state, data) => {
      console.log('state.newIndent_', data)
      state.newIndent = data
      console.log('NEW_INDENT_', state.newIndent)
    },
    // 为订单添加其他信息
    ADD_INDENT: (state, data) => {
      console.log(data)
      Object.assign(state.newIndent, data)
      console.log('ADD_INDENT_', state.newIndent)
    }
  },
  actions: {
    GetShopCartInfo({ commit, getters }) {
      return shopCart().then(res => {
        console.log('SET_SHOPCART', res.data)
        commit('SET_SHOPCART', res.data)
        return res.data
      })
    }
  }
}
export default shopCartModule
