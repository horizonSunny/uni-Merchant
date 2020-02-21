const userModule = {
  state: {
    addRouters: [],
    permissionRouter: []
  },
  getters: {
    getPermission(state, getters, rootState, rootGetters) {
      // console.log('rootGetters_', rootGetters)
      return rootGetters.permissions;
    }
  },
  mutations: {
    // SET_ROUTERS: (state, routers) => {
    //   state.addRouters = routers;
    // },
    // SET_PERMISSION_ROUTER: (state, siderbar) => {
    //   state.permissionRouter = siderbar;
    // }
  },
  actions: {
    // AddRouter({ commit, getters }) {
    //   console.log("getters.getPermission_", getters.getPermission);
    //   const asyncRouters = deepCopy(asyncRouter);
    //   const addRouter = filterAsyncRouter(asyncRouters, getters.getPermission);
    //   // 这边添加main，放入mainchildren,不能深拷贝，会形成两个mainComponent
    //   addMainRouter[0].children = addRouter;
    //   console.log("addRouter_", addMainRouter);
    //   commit("SET_ROUTERS", addMainRouter);
    // }
  }
};
export default userModule;
