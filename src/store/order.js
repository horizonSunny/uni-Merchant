import { shopCart, shipper, traces } from '@/service/index'
const shopCartModule = {
  state: {
    orderDetails: null,
    // 快递公司列表
    shipper: [],
    // 物流信息
    traces: null,
    deliveryTime: '暂无',
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
    SET_deliveryTime: (state, data) => {
      state.deliveryTime = data
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
      // 测试用
      let testInfo = {
        logisticCode: '75340139495421',
        shipperCode: 'ZTO',
      }
      // deliveryTime
      return traces(testInfo).then((res) => {
        commit('SET_TRACE', res.data)
        commit('SET_deliveryTime', params.deliveryTime)
        console.log('SET_TRACE', res.data)
        return res.data
      })
    },
  },
}
export default shopCartModule
