<template>
  <div>
    <m-top-app-bar fixed class="nav">
      <router-link to="/" tag="div" slot="navigation" class="nav-item">
        <img src="/src/assets/logo.png">
      </router-link>

      <router-link to="/">Rent</router-link>
      <router-link to="/">Host</router-link>

      <router-link to="/" slot="actions">STORY</router-link>
      <router-link to="/" slot="actions">FAQ</router-link>
      <router-link v-if="!loggedIn" to="/login" slot="actions">SIGN IN</router-link>
      <router-link v-if="loggedIn" to="/login" slot="actions">SIGN OUT</router-link>

    </m-top-app-bar>
  </div>
</template>

<script>
  import Vue from "vue"
  import TopAppBar from "material-components-vue/dist/top-app-bar"

  Vue.use(TopAppBar);


  export default {
    computed: {
      loggedIn(){
        return this.$store.getters.loggedIn;
      }
    },
  }
</script>

<style lang="scss">
  @import "../../../node_modules/material-components-vue/dist/top-app-bar/styles";

  .nav{
    @include mdc-top-app-bar-fill-color(white);

    z-index: 1;
    height: 70px;
    margin: 0;
    padding-left: 50px;
    padding-right: 50px;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14),
      0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  }

  .nav img{
    position: relative;
    bottom: 5px;
    height: 25px;
    display: flex;
  }

  .nav a{
    color: #546F7A !important;
    width: 80px;
    height: 100%;
    font-size: 14px;
    border-bottom: 5px solid transparent;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
  }

  .nav .mdc-top-app-bar__section--align-end a{
    width: 90px;
  }

  .nav a:hover{
    background: #EDEFF0 !important;
    box-sizing: border-box !important;
    border-bottom: 5px solid #03A9F4;
  }

  .nav .mdc-top-app-bar__section{
    padding-top: 0;
    padding-bottom: 0;
  }

  .nav .mdc-top-app-bar__title{
    display: flex;
    padding-left: 50px;
  }

  .nav .mdc-top-app-bar__title, .nav .mdc-top-app-bar__row{
    height: 100%;
  }
</style>
