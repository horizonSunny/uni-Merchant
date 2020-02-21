const businessModule = {
  state: {
    // addRouters: [],
    // permissionRouter: []
  },
  getters: {
    getPermission(state, getters, rootState, rootGetters) {
      // console.log('rootGetters_', rootGetters)
      return rootGetters.permissions;
    }
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
    },
    SET_PERMISSION_ROUTER: (state, siderbar) => {
      state.permissionRouter = siderbar;
    }
  },
  actions: {
    AddRouter({ commit, getters }) {
      console.log("getters.getPermission_", getters.getPermission);
      const asyncRouters = deepCopy(asyncRouter);
      const addRouter = filterAsyncRouter(asyncRouters, getters.getPermission);
      // 这边添加main，放入mainchildren,不能深拷贝，会形成两个mainComponent
      addMainRouter[0].children = addRouter;
      console.log("addRouter_", addMainRouter);
      commit("SET_ROUTERS", addMainRouter);
    },
    PemissionRouter({ commit, state }) {
      // 这边深拷贝一下main模块中的路由，然后改变路径+父级路径
      // console.log('state.addRouters-', state.addRouters)
      const deepRouter = deepCopy(state.addRouters);
      console.log("deepRouter_", deepRouter);
      const newRouter = deepCopy(deepRouter);
      const permissionRouter = filterPermissionRouter(newRouter, "");
      console.log("permissionRouter_", permissionRouter);
      commit("SET_PERMISSION_ROUTER", permissionRouter);
    }
  }
};
export default businessModule;
