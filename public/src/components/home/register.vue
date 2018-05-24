<template>
  <m-card class="auth-card">
    <div class="auth-title">
      Sign Up Today
    </div>

    <div class="auth-user-type">
      <button class="greyed-out">HOST</button>
      <button class="active">STORE</button>
    </div>

    <div class="auth-form">
      <div class="auth-name">
        <m-textfield outlined id="first-name" :value="fName">
          <m-floating-label for="first-name">
            First Name
          </m-floating-label>
          <m-notched-outline></m-notched-outline>
        </m-textfield>

        <m-textfield outlined id="last-name" :value="lName">
          <m-floating-label for="last-name">
            Last Name
          </m-floating-label>
          <m-notched-outline></m-notched-outline>
        </m-textfield>
      </div>

      <div class="auth-contact"
    </div>
  </m-card>
</template>

<script>
  import Vue from "vue";
  import Card from "material-components-vue/dist/card"
  import Button from "material-components-vue/dist/button"
  import TextField from "material-components-vue/dist/textfield"
  import NotchedOutline from "material-components-vue/dist/notched-outline"
  import FloatingLabel from "material-components-vue/dist/floating-label"
  import Elevation from "material-components-vue/dist/elevation"

  Vue.use(Card);
  Vue.use(Button);
  Vue.use(TextField);
  Vue.use(NotchedOutline);
  Vue.use(FloatingLabel);
  Vue.use(Elevation);

  export default {
    data(){
      return {
        fName: "",
        lName: ""
      }
    }
  }

</script>

<style lang="scss">
  @import "~material-components-vue/dist/card/styles";
  @import "~material-components-vue/dist/button/styles";
  @import "~material-components-vue/dist/textfield/styles";
  @import "~material-components-vue/dist/notched-outline/styles";
  @import "~material-components-vue/dist/floating-label/styles";
  @import "~material-components-vue/dist/elevation/styles";

  .auth-card{
    width: 330px;
    padding: 20px 40px;
    margin-right: 80px;
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
    width: 120px;
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

  .auth-card .mdc-text-field{
    @include mdc-text-field-focused-outline-color(#369FDA);
    @include mdc-text-field-outline-color(#EBEFF1);

    height: 30px;
    margin: 0 !important;
  }

  .auth-card .mdc-text-field--outlined{
    height: 30px;
  }

  .auth-card .mdc-text-field__input{
    padding: 0 12px 2px;
  }

  .auth-card .mdc-notched-outline{
    @include mdc-notched-outline-stroke-width(2px);
  }

  .auth-card .mdc-notched-outline,
  .auth-card .mdc-notched-outline__idle{
    border-radius: 0;
  }

  .auth-card .mdc-notched-outline svg{
    position: relative;
  }

  .auth-card .mdc-floating-label{
    color: #EBEFF1 !important;
    bottom: 7px;
  }

  .auth-card .mdc-floating-label,
  .auth-card .mdc-text-field__input{
    font-size: 13px;
  }

  .auth-card .mdc-floating-label--float-above{
    transform: translateY(-70%) scale(0.75);
    color: #369FDA !important;
  }

  .auth-name{
    display: flex;
    flex-direction: row;
  }
</style>
