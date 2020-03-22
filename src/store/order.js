import { shopCart } from "@/service/index";
const shopCartModule = {
  state: {
    orderDetails: null
  },
  getters: {},
  mutations: {
    SET_ORDER_DETAILS: (state, data) => {
      state.orderDetails = data;
    }
  },
  actions: {}
};
export default shopCartModule;
