import { shopCart, shipper, traces } from '@/service/index'
const shopCartModule = {
  state: {
    orderDetails: null,
    // 快递公司列表
    shipper: [],
    // 物流信息
    traces: null,
  },
  getters: {},
  mutations: {
    SET_ORDER_DETAILS: (state, data) => {
      state.orderDetails = data
    },
    SET_SHIPPER: (state, data) => {
      state.shipper = data
    },
    SET_TRACE: (state, data) => {
      state.traces = data
    },
  },
  actions: {
    GetShipper({ commit, getters }) {
      return shipper().then((res) => {
        commit('SET_SHIPPER', res.data)
        console.log('SET_SHIPPER_', res.data)
        return res.data
      })
    },
    GetTraces({ commit, getters }, params) {
      return traces(params).then((res) => {
        commit('SET_TRACE', res.data)
        console.log('SET_TRACE', res.data)
        return res.data
      })
    },
  },
}
export default shopCartModule
