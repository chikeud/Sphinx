/**
 * @author EmmanuelOlaojo
 * @since 5/23/18
 */

import Vue from "vue";
import Router from "vue-router";

import Main from "../components/main/main.vue";
import Info from "../components/main/info.vue";
import Dashboard from "../components/main/side-nav/components/dashboard.vue";
import Rentals from "../components/main/side-nav/components/rentals.vue";
import Listings from "../components/main/side-nav/components/listings.vue";
import Messages from "../components/main/side-nav/components/messaging/messages.vue";
import Favourites from "../components/main/side-nav/components/favourites.vue";
import Help from "../components/main/side-nav/components/help.vue";
import Settings from "../components/main/side-nav/components/settings.vue";
import Verification from "../components/main/side-nav/components/verification.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Main,
      children: [
        {
          path: "/",
          component: Info
        },
        {
          path: "/dashboard",
          component: Dashboard
        },
        {
          path: "/rentals",
          component: Rentals
        },
        {
          path: "/listings",
          component: Listings
        },
        {
          path: "/messages",
          component: Messages
        },
        {
          path: "/favourites",
          component: Favourites
        },
        {
          path: "/help",
          component: Help
        },
        {
          path: "/settings",
          component: Settings
        },
        {
          path: "/verification",
          component: Verification
        },
      ]
    },
  ]
});
