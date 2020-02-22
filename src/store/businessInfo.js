import { getClassify } from "@/service/index";
const businessModule = {
  state: {
    classifyInfo: []
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
    }
  },
  actions: {
    GetClassify({ commit, getters }) {
      getClassify().then(res => {
        commit("SET_ClASSIFY", res.data);
      });
    }
  }
};
export default businessModule;
