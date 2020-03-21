import { shopCart } from "@/service/index";
const shopCartModule = {
  state: {
    shopCartInfo: [],
    // 由购物车或者立即购买生成的订单信息
    newIndent: ""
  },
  getters: {},
  mutations: {
    SET_SHOPCART: (state, data) => {
      state.shopCartInfo = data;
    },
    // 代表订单里面的所有信息
    NEW_INDENT: (state, data) => {
      state.newIndent = data;
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
