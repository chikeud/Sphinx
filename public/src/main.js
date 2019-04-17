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
    console.log(res);
    if(res.status === status.UNAUTHORIZED){
      store.commit("clearToken");
    }
  });
});

let store = new Vuex.Store({
  state: {
    token: "",
    user: null,
    showLogin: false,
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

    showLogin(state){
      return state.showLogin;
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
     * Sets the value of user in the store
     * and localStorage
     *
     * @param state global state
     * @param user auth user
     */
    user(state, user) {
      localStorage.setItem(config.USER, user);

      state.user = user;
    },

    /**
     * Clears the auth token from localStorage
     * and in the store.
     *
     * @param state
     */
    clearSession(state){
      console.log("Clear Token");
      localStorage.removeItem(config.AUTH);
      localStorage.removeItem(config.USER);
      state.token = "";
      state.user = null;
      router.push("/");
    },

    showLogin(state, show){
      state.showLogin = show;
    }
  }
});

new Vue({
  el: "#app",
  components: {App},
  template: "<App/>",
  router,
  store
});

