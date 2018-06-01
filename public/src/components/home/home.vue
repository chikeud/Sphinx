<template>
  <div id="home">
    <div class="home-banner">
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

  import Register from "./register.vue"

  export default {
    data(){
      return {
        content: "Some fucking content"
      }
    },
    components: {
      "sign-up": Register
    }
  }
</script>

<style lang="scss">
  #home{
    position: relative;
    top: 130px;
    margin: 0;
    padding: 0;
  }

  .home-banner{
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
