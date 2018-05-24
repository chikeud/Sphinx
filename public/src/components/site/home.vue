<template>
  <div id="home">
    <div class="home-banner">
      <div class="banner-content">

      </div>

      <div class="banner-auth">
        <m-card class="auth-card">
          <div class="auth-title">
            Create Account
          </div>

          <div class="auth-user-type">
            <button class="greyed-out">HOST</button>
            <button class="active">STORE</button>
          </div>

          <div class="auth-form">
            {{content}}
          </div>
        </m-card>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import Card from "material-components-vue/dist/card"
  import Button from "material-components-vue/dist/button"
  import Elevation from "material-components-vue/dist/elevation"

  Vue.use(Card);
  Vue.use(Button);
  Vue.use(Elevation);

  export default {
    data(){
      return {
        content: "Some fucking content"
      }
    }
  }
</script>

<style lang="scss">
  @import "~material-components-vue/dist/card/styles";
  @import "~material-components-vue/dist/button/styles";
  @import "~material-components-vue/dist/elevation/styles";

  #home{
    font-family: "Montserrat", sans-serif ;
    position: relative;
    top: 130px;
    margin: 0;
    padding: 0;
  }

  .home-banner{
    display: flex;
    flex-direction: row;
  }

  .auth-card{
    width: 330px;
    padding: 20px 40px;
    margin-right: 80px;
  }

  .banner-content{
    flex: 3;
  }

  .banner-auth{
    display: flex;
    justify-content: space-between;
    flex: 1;
  }

  .auth-title{
    text-align: left;
    font-size: 19px;
    margin-bottom: 25px;
  }

  .auth-user-type{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .auth-user-type button{
    border: none;
    width: 115px;
    height: 35px;
    color: white;
    font-size: 14px;
    font-weight: bold;
  }

  .greyed-out{
    background: #EBEFF1;
    color: #CBD6DA !important;
  }

  .active{
    background: #369FDA;
  }
</style>
