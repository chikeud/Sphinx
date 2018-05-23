<template>
  <div>
    <m-top-app-bar fixed class="nav">
      <img src="/src/assets/logo.png" slot="navigation">

      <m-button href="/">Rent</m-button>
      <m-button href="/">Host</m-button>

      <m-button href="/" slot="actions">STORY</m-button>
      <m-button href="/" slot="actions">HELP</m-button>
      <m-button href="/" slot="actions">SIGN IN</m-button>
    </m-top-app-bar>
  </div>
</template>

<script>
  import Vue from "vue"
  import TopAppBar from "material-components-vue/dist/top-app-bar"
  import Elevation from "material-components-vue/dist/elevation"
  import Icon from "material-components-vue/dist/icon"
  import Button from "material-components-vue/dist/button"

  Vue.use(TopAppBar);
  Vue.use(Elevation);
  Vue.use(Button);
  Vue.use(Icon);

  export default {}
</script>

<style lang="scss">
  @import "~material-components-vue/dist/top-app-bar/styles";
  @import "~material-components-vue/dist/elevation/styles";
  @import "~material-components-vue/dist/button/styles";

  .nav{
    @include mdc-top-app-bar-fill-color(white);

    margin: 0;
    padding-left: 50px;
    padding-right: 50px;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14),
      0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  }

  .nav img{
    width: 90px;
    display: flex;
  }

  .nav a{
    @include mdc-button-ink-color(#7B8E96);

    width: 80px;
    height: 100%;
    border-bottom: 4px solid transparent;
    box-sizing: border-box;
    --mdc-ripple-fg-size: 0;
  }

  .nav a:hover{
    background: #EBEFF1;
    box-sizing: border-box !important;
    border-bottom: 4px solid #369FDA;
  }

  .nav a:hover::before, .nav button:hover::after{
    opacity: 0 !important;
  }

  .nav a::before, .nav button::after{
    opacity: 0 !important;
  }

  .mdc-top-app-bar__section{
    padding-top: 0;
    padding-bottom: 0;
  }

  .mdc-top-app-bar__title{
    height: 100%;
  }
</style>
