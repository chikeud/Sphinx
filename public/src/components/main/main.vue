<template>
  <div id="main">
    <side-nav class="main-side-nav"></side-nav>

    <div class="main-content">
      <div class="banner-content">

      </div>

      <div class="banner-auth">
        <sign-up></sign-up>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";

  import Register from "./register.vue";
  import SideNav from "./side-nav.vue";

  export default {
    data(){
      return {
        content: "Some fucking content"
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
    position: relative;
    top: 140px;
    margin: 0;
    padding: 0;
  }

  #main .main-side-nav{
    flex: 1;
    border-right: none;
  }

  .main-content{
    flex: 6;
    display: flex;
    flex-direction: row;
  }

  .banner-content{
    flex: 3;
  }

  .banner-auth{
    display: flex;
    justify-content: space-between;
    flex: 1;
  }
</style>
