import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    menuList: []
  },
  mutations: {
    changeMenu(state, newMenuList) {
      state.menuList = newMenuList;
    }
  }
});
export default store;
