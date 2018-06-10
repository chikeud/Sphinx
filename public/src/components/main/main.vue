<template>
  <div id="main">
    <side-nav class="main-side-nav"></side-nav>

    <div class="main-content">
      <div class="app-content">
        <router-view>

        </router-view>
      </div>

      <div v-if="!loggedIn" class="app-auth">
        <sign-up></sign-up>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";

  import Register from "./registration/register.vue";
  import SideNav from "./side-nav/side-nav.vue";

  export default {
    data(){
      return {
        content: "Some fucking content"
      }
    },

    computed: {
      loggedIn(){
        return this.$store.getters.loggedIn;
      }
    },

    components: {
      "sign-up": Register,
      "side-nav": SideNav
    }
  }
</script>

<style lang="scss">
  #main{
    display: flex;
    align-items: flex-start;
    position: relative;
    top: 140px;
    margin: 0;
    padding: 0;
  }

  #main .main-side-nav{
    flex: 1;
    min-width: 200px;
    border-right: none;
    background-color: transparent;
  }

  .main-content{
    flex: 6;
    display: flex;
    flex-direction: row;
  }

  .app-content{
    flex: 3;
  }

  .app-auth{
    display: flex;
    justify-content: space-between;
    flex: 1;
  }
</style>
