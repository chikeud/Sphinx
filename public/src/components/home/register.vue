<template>
  <m-card class="r-card">
    <div class="r-title">
      Sign Up Today
    </div>

    <div class="r-user-type">
      <button class="greyed-out">HOST</button>
      <button class="active">STORE</button>
    </div>

    <div class="r-form">
      <div class="r1">
        <div class="r-name r-section">
          <m-textfield outlined id="first-name" :value="fName">
            <m-floating-label for="first-name">First Name</m-floating-label>
            <m-notched-outline></m-notched-outline>
          </m-textfield>

          <m-textfield outlined id="last-name" :value="lName">
            <m-floating-label for="last-name">Last Name</m-floating-label>
            <m-notched-outline></m-notched-outline>
          </m-textfield>
        </div>

        <div class="r-contact r-section">
          <m-textfield outlined id="email" :value="email">
            <m-floating-label for="email">Email</m-floating-label>
            <m-notched-outline></m-notched-outline>
          </m-textfield>

          <m-textfield outlined id="phone" :value="phone">
            <m-floating-label for="phone">Phone</m-floating-label>
            <m-notched-outline></m-notched-outline>
          </m-textfield>

          <m-textfield outlined id="password" :value="password">
            <m-floating-label for="password">Password</m-floating-label>
            <m-notched-outline></m-notched-outline>
          </m-textfield>
        </div>

        <div class="r-city r-section">
          <m-textfield outlined id="city" :value="city">
            <m-floating-label for="city">City</m-floating-label>
            <m-notched-outline></m-notched-outline>
          </m-textfield>
        </div>
      </div>
    </div>

    <div class="r-action">
      <m-button>SIGN UP</m-button>
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
        submitText: "SIGN UP",
        fName: "",
        lName: "",
        email: "",
        phone: "",
        password: "",
        city: ""
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

  .r-card{
    width: 330px;
    padding: 20px 40px;
    margin-right: 80px;
  }

  .r-title{
    text-align: left;
    font-size: 19px;
    margin-bottom: 25px;
  }

  .r-user-type{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .r-user-type button{
    border: none;
    width: 120px;
    height: 35px;
    color: white;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
  }

  .r-user-type button:focus{
    outline: none
  }

  .greyed-out{
    background: #EBEFF1;
    color: #CBD6DA !important;
  }

  .active{
    background: #369FDA;
  }

  .r-card .mdc-text-field{
    @include mdc-text-field-focused-outline-color(#369FDA);
    @include mdc-text-field-outline-color(#EBEFF1);

    margin: 0 !important;
  }

  .r-card .mdc-text-field--outlined{
    height: 35px;
  }

  .r-card .mdc-text-field__input{
    padding: 0 12px 2px;
  }

  .r-card .mdc-notched-outline{
    @include mdc-notched-outline-stroke-width(2px);
  }

  .r-card .mdc-notched-outline,
  .r-card .mdc-notched-outline__idle{
    border-radius: 0;
  }

  .r-card .mdc-notched-outline svg{
    position: relative;
  }

  .r-card .mdc-floating-label{
    color: lightgray !important;
    bottom: 9px;
  }

  .r-card .mdc-floating-label,
  .r-card .mdc-text-field__input{
    font-size: 13px;
  }

  .r-card .mdc-floating-label--float-above{
    transform: translateY(-70%) scale(0.75);
    color: #369FDA !important;
  }

  .r-section{
    margin-bottom: 10px;
  }

  .r-form .mdc-text-field{
    width: 100%;
  }

  .r-name{
    display: flex;
    flex-direction: row;
  }

  .r-action .mdc-button{
    @include mdc-button-container-fill-color(#369FDA);
    @include mdc-button-ink-color(white);

    width: 100%;
    font-weight: bold;
    margin-top: 20px;
  }
</style>
