<template>
  <m-drawer-permanent id="side-nav">
    <m-drawer-content>
      <m-list>
        <m-list-group class="side-nav-top">
          <m-list-item v-for="item in topItems" :key="item.id" :class="item.id">
            <router-link :to="item.url">
              <m-icon :icon="item.icon"></m-icon>
              <span>{{item.text}}</span>
            </router-link>
          </m-list-item>
        </m-list-group>

        <m-list-divider></m-list-divider>

        <m-list-group class="side-nav-mid">
          <m-list-item v-for="item in midItems" :key="item.id" :class="item.id">
            <router-link :to="item.url">
              <m-icon :icon="item.icon"></m-icon>
              <span>{{item.text}}</span>
            </router-link>
          </m-list-item>
        </m-list-group>

        <m-list-divider></m-list-divider>

        <m-list-group class="side-nav-bottom">
          <m-list-item v-for="item in bottomItems" :key="item.id" :class="item.id">
            <router-link :to="item.url">
              <m-icon :icon="item.icon"></m-icon>
              <span>{{item.text}}</span>
            </router-link>
          </m-list-item>
        </m-list-group>
      </m-list>
    </m-drawer-content>
  </m-drawer-permanent>
</template>

<script>
  import Vue from "vue"
  import Drawer from "material-components-vue/dist/drawer"
  import List from "material-components-vue/dist/list"
  import Icon from "material-components-vue/dist/icon"

  Vue.use(Drawer);
  Vue.use(List);
  Vue.use(Icon);

  export default {
    data(){
      return {
        on: "dashboard",

        topItems: [{
          id: "dashboard",
          text: "Dashboard",
          icon: "view_compact",
          url: "/"
        }],

        midItems: [
          {
            id: "rentals",
            text: "My Rentals",
            icon: "view_module",
            url: "/rentals"
          },

          {
            id: "listings",
            text: "My Listings",
            icon: "home",
            url: "/listings"
          },

          {
            id: "messages",
            text: "Messages",
            icon: "message",
            url: "/messages"
          },

          {
            id: "favourites",
            text: "Favourites",
            icon: "favorites",
            url: "/favourites"
          }
        ],

        bottomItems: [
          {
            id: "help",
            text: "Help",
            icon: "help",
            url: "/help"
          },

          {
            id: "settings",
            text: "Settings",
            icon: "settings",
            url: "/settings"
          },

          {
            id: "verified",
            text: "Get Verified!",
            icon: "verified_user",
            url: "/verify",
          }
        ]
      }
    },
  }
</script>

<style lang="scss">
  @import "../../../node_modules/material-components-vue/dist/drawer/styles";
  @import "../../../node_modules/material-components-vue/dist/list/styles";

  #side-nav .material-icons{
    margin-right: 10px;
    font-size: 20px;
    max-width: 20px;
  }

  #side-nav .router-link-exact-active .material-icons{
    color: #03A9F4;
  }

  #side-nav .mdc-list{
    padding-top: 0;
  }

  #side-nav .mdc-list-group{
    padding: 10px 0 10px 50px;
  }

  #side-nav .side-nav-top{
    padding-top: 0;
  }

  #side-nav .mdc-list-item{
  }

  #side-nav a{
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    color: #90A4AE;
    text-decoration: none;
  }

  #side-nav :not(.mdc-list--non-interactive) > .mdc-list-item:hover::before {
    opacity: 0.075;
  }

  #side-nav .verified{
    background-color: #F1F8E9;
  }

  #side-nav .verified a{
    color: #8BC34A;
  }

  #side-nav .verified .material-icons{
    color: #8BC34A
  }
</style>
