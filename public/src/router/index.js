/**
 * @author EmmanuelOlaojo
 * @since 5/23/18
 */

import Vue from "vue";
import Router from "vue-router";

import Home from "../components/home/home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {path: "/", component: Home},
  ]
});