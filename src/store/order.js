import { shopCart } from "@/service/index";
const shopCartModule = {
  state: {
    shopCartInfo: [],
    orderDetails: null
  },
  getters: {},
  mutations: {
    SET_SHOPCART: (state, data) => {
      state.shopCartInfo = data;
    },
    SET_ORDER_DETAILS: (state, data) => {
      state.orderDetails = data;
    }
  },
  actions: {
    GetShopCartInfo({ commit, getters }) {
      return shopCart().then(res => {
        commit("SET_SHOPCART", res.data);
        return res.data;
      });
    }
  }
};
export default shopCartModule;
