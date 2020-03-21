import {
  getClassify,
  getMainInfo,
  searchKeyword,
  getMedicineTemplate
} from "@/service/index";
const businessModule = {
  state: {
    // 找药/分类数据
    classifyInfo: [],
    // 获取main主页信息后，分成四类信息，商户信息，轮播图信息，快速分类信息，商家推荐商品信息
    tenant: {},
    banners: [],
    quickCategorys: [],
    products: [],
    // 获取搜索词库
    searchKeyword: [],
    // 获取病史模版
    getMedicineTemplate: [],
    myIndentInfo: null
  },
  getters: {
    // getPermission(state, getters, rootState, rootGetters) {
    //   // console.log('rootGetters_', rootGetters)
    //   return rootGetters.permissions;
    // }
  },
  mutations: {
    SET_ClASSIFY: (state, classify) => {
      state.classifyInfo = classify;
    },
    SET_MAIN: (state, mainInfo) => {
      console.log("mainInfo_", mainInfo);
      state.tenant = mainInfo.tenant;
      state.banners = mainInfo.banners;
      state.quickCategorys = mainInfo.quickCategorys;
      state.products = mainInfo.products;
    },
    SET_SEARCH_KEY: (state, keyword) => {
      state.searchKeyword = keyword;
    },
    SET_MEDICINE_TEMPLATE: (state, templateInfo) => {
      state.getMedicineTemplate = templateInfo;
    },
    // 设置我的订单页面关于点击某一个订单信息，保存订单的问题
    SET_INDENT_INFO: (state, indentInfo) => {
      // 设置一个五星标志
      indentInfo.orderItems.forEach(item => {
        item.rate = 5;
      });
      state.myIndentInfo = indentInfo;
      console.log("indentInfo_", indentInfo);
    }
  },
  actions: {
    GetClassify({ commit, getters }) {
      return getClassify().then(res => {
        commit("SET_ClASSIFY", res.data);
        return res.data;
      });
    },
    // 获取主页信息数据
    GetMainInfo({ commit }) {
      return getMainInfo().then(res => {
        // commit('SET_ClASSIFY', res.data)
        commit("SET_MAIN", res.data);
        return res.data;
      });
    },
    // 获取搜索词库
    GetKeyWord({ commit }) {
      searchKeyword().then(res => {
        commit("SET_SEARCH_KEY", res.data);
      });
    },
    // 获取病史模版
    GetMedicineTemplate({ commit }) {
      getMedicineTemplate().then(res => {
        commit("SET_MEDICINE_TEMPLATE", res.data);
      });
    }
  }
};
export default businessModule;
