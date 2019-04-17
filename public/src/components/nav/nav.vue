<template>
  <div>
    <m-top-app-bar fixed class="nav">
      <router-link to="/" tag="div" slot="navigation" class="nav-item">
        <img src="/src/assets/logo.png">
      </router-link>

      <router-link v-if="!loggedIn" to="/login"  class="nav-link">Book Now</router-link>
      <router-link v-if="loggedIn" to="/booking"  class="nav-link">Book Now</router-link>
      <!--<router-link to="/">Host</router-link> -->

      <router-link to="/" slot="actions" class="nav-link">STORY</router-link>
      <router-link to="/" slot="actions" class="nav-link">FAQ</router-link>
      <router-link v-if="!loggedIn" to="/login" slot="actions" class="nav-link">SIGN IN</router-link>
      <router-link v-if="loggedIn" to="/" v-on:click.native="logout()" slot="actions" class="nav-link">SIGN OUT</router-link>


    </m-top-app-bar>
  </div>
</template>

<script>
  import Vue from "vue"
  import TopAppBar from "material-components-vue/dist/top-app-bar"

  Vue.use(TopAppBar);


  export default {
    methods: {
      async logout() {
        let self = this;
        try {
          let res = await self.$http.get('/api/u/auth/logout');
          self.$store.commit('clearSession');
        } catch (err) {
          console.log(err);
        }
      }
    },
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

    z-index: 9999;
    height: 70px;
    margin: 0;
    padding-left: 50px;
    padding-right: 50px;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14),
      0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    text-decoration: none !important;
  }

  .nav-link{
    text-decoration: none !important;
  }

  .nav img{
    position: relative;
    bottom: 5px;
    height: 25px;
    display: flex;
    max-width: unset; // vue-material sets this as 100% causes the logo to be skewed
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
