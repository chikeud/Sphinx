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
      let user = localStorage.getItem(config.USER);
      let _user = JSON.parse(JSON.stringify(state.user));

      if(!_.isEqual(user, _user)){
        state.user = user;
      }

      return !!state.user;
    }
  },

  mutations: {
    /**
     * Sets the value of token in the store
     * and localStorage
     *
     * @param state global state
     * @param token auth token
     * @param user logged in user
     */
    token(state, token, user){
      localStorage.setItem(config.AUTH, token);
      localStorage.setItem(config.USER, user);

      state.token = token;
      state.user = user;
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

      if(state.user){
        localStorage.removeItem(config.USER);
        state.user = null;
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

