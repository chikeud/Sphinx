<template>
  <m-drawer-permanent id="side-nav">
    <m-drawer-content>
      <m-list>
        <m-list-group class="side-nav-top">
          <m-list-item>
            <router-link to="/">
              <m-icon :class="{
                'stor-blue-text': on='dashboard'
              }" icon="dashboard">
              </m-icon>
              Dashboard
            </router-link>
          </m-list-item>
        </m-list-group>

        <m-list-divider></m-list-divider>

        <m-list-group>
          <m-list-item>
            <router-link to="/">
              <m-icon icon="view_module"></m-icon> My Items
            </router-link>
          </m-list-item>

          <m-list-item>
            <router-link to="/">
              <m-icon icon="message"></m-icon> Messages
            </router-link>
          </m-list-item>

          <m-list-item>
            <router-link to="/">
              <m-icon icon="home"></m-icon> Hosts
            </router-link>
          </m-list-item>

          <m-list-item>
            <router-link to="/">
              <m-icon icon="favorite"></m-icon> Favourites
            </router-link>
          </m-list-item>
        </m-list-group>

        <m-list-divider></m-list-divider>

        <m-list-group>
          <m-list-item>
            <router-link to="/">
              <m-icon icon="help"></m-icon> Help
            </router-link>
          </m-list-item>

          <m-list-item>
            <router-link to="/">
              <m-icon icon="settings"></m-icon> Settings
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
        on: "dashboard"
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../node_modules/material-components-vue/dist/drawer/styles";
  @import "../../../node_modules/material-components-vue/dist/list/styles";

  #side-nav  .material-icons{
    margin-right: 10px;
    font-size: 20px;
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
    opacity: 0.1;
  }

  .stor-blue-text{
    color: #03A9F4;
  }
</style>
