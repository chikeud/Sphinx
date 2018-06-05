import Vue from "vue";
import VueResource from "vue-resource";
import Vuex from "vuex";
import _ from "lodash";

import App from "./App.vue";
import router from "./router";
import config from "./config";
import status from "../../utils/HttpStats";

Vue.use(VueResource);
Vue.use(Vuex);

Vue.http.interceptors.push((req, next) => {
  let token = localStorage.getItem(config.AUTH);
  let exists = !!req.headers.get(config.AUTH_TOKEN);

  if(!exists) req.headers.set(config.AUTH_TOKEN, token);

  next(res => {
    if(res.status === status.UNAUTHORIZED){
      store.commit("clearToken");
    }
  });
});

let store = new Vuex.Store({
  state: {
    token: "",
    user: null
  },

  getters: {
    /**
     * @param state store state
     * @returns boolean login state
     */
    loggedIn(state){
      let token = localStorage.getItem(config.AUTH);

      if(token !== state.token){
        state.token = token;
      }

      return !!state.token;
    },

    user(state){
      return state.user || localStorage.getItem(config.USER);
    }
  },

  mutations: {
    /**
     * Sets the value of token in the store
     * and localStorage
     *
     * @param state global state
     * @param token auth token
     */
    token(state, token){
      localStorage.setItem(config.AUTH, token);

      state.token = token;
    },

    /**
     * Clears the auth token from localStorage
     * and in the store.
     *
     * @param state
     */
    clearToken(state){
      if(state.token){
        localStorage.removeItem(config.AUTH);
        state.token = "";
      }
    },
  }
});

new Vue({
  el: "#app",
  components: {App},
  template: "<App/>",
  router,
  store
});

