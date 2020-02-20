import Vue from "vue";
import Vuex from "vuex";
import user from "./userInfo";
import business from "./businessInfo";
import getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    business
  },
  getters
});

export default store;
