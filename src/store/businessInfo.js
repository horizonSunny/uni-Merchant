import { getClassify } from "@service/index";
const businessModule = {
  state: {
    classifyInfo: []
    // permissionRouter: []
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
      // this.$http.get
      // const addRouter = filterAsyncRouter(asyncRouters, getters.getPermission);
      // 这边添加main，放入mainchildren,不能深拷贝，会形成两个mainComponent
      addMainRouter[0].children = addRouter;
      console.log("addRouter_", addMainRouter);
      commit("SET_ROUTERS", addMainRouter);
    }
  }
};
export default businessModule;
