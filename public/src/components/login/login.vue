<template>
  <div class="big">
    <m-card class="l-card">
      <div class="l-title">
        Sign In
      </div>

      <form @submit.prevent="login" class="l-form">
        <div class="l-section">

          <m-textfield v-model="alias" outlined>

            <m-floating-label>
              Username or Email
            </m-floating-label>

            <m-notched-outline></m-notched-outline>
          </m-textfield>
        </div>

        <div class="l-section">

          <m-textfield type="password" v-model="password" outlined>

            <m-floating-label>
              Password

            </m-floating-label>

            <m-notched-outline></m-notched-outline>
          </m-textfield>
        </div>

        <div class="l-error l-terms l-section" v-if="errMsg">
          {{errMsg}}
        </div>


        <div class="l-sign-up">
          <button type="submit" class="l-button stor-blue">SIGN IN</button>
        </div>

        <div class="l-terms">
          Don't have an account?
          <router-link to="/">Sign Up</router-link>


        </div>
        <div class="l-terms">
          Or Sign In with
        </div>
        <div class="l-social">
          <div style="padding: 7px; text-align: center; width: 48%; margin-right: 5px;" class="l-button google-red" ><a style="color: white; text-decoration: none !important;" href="/api/u/auth/google">Google</a></div>
          <div style="padding: 7px; text-align: center; width: 48%; margin-right: 5px;" class="l-button facebook-blue" ><a style="color: white; text-decoration: none !important;" href="/api/u/auth/facebook">Facebook</a></div>
        </div>
      </form>
    </m-card>
  </div>

</template>

<script>
  import Vue from "vue";
  import Card from "material-components-vue/dist/card";
  import Button from "material-components-vue/dist/button";
  import TextField from "material-components-vue/dist/textfield";
  import NotchedOutline from "material-components-vue/dist/notched-outline";
  import FloatingLabel from "material-components-vue/dist/floating-label";
  import Elevation from "material-components-vue/dist/elevation";
  import Icon from "material-components-vue/dist/icon";


  Vue.use(Card);
  Vue.use(Button);
  Vue.use(TextField);
  Vue.use(NotchedOutline);
  Vue.use(FloatingLabel);
  Vue.use(Elevation);
  Vue.use(Icon);

  export default {
    data() {
      return {
        alias: ""
        , password: ""
        , errMsg: ""
      }
    },

    methods: {
      /**
       * Submits the login form
       */
      login: async function () {
        let self = this;
        let {alias, password} = self;
        //console.log(self);

        try {
          let credentials = {alias, password};
          console.log(credentials);
          let loginRoute = '/api/u/auth/login';
          let res = await self.$http.post(loginRoute, credentials);
          self.$store.commit("token", res.body.result.token);
          self.$store.commit("user", res.body.result.user);
          this.$router.push('/dashboard');
        }
        catch (err) {
          self.errMsg = "Invalid Credentials";
          console.log(err);
        }
      },

    },

    computed: {
      loggedIn() {
        return this.$store.getters.loggedIn;
      }
    },
  }

</script>

<style lang="scss">
  @import "../../../node_modules/material-components-vue/dist/card/styles";
  @import "../../../node_modules/material-components-vue/dist/button/styles";
  @import "../../../node_modules/material-components-vue/dist/textfield/styles";
  @import "../../../node_modules/material-components-vue/dist/notched-outline/styles";
  @import "../../../node_modules/material-components-vue/dist/floating-label/styles";
  @import "../../../node_modules/material-components-vue/dist/elevation/styles";


  .big{
    background-image: url("../../assets/stor-home.jpg");
    background-size: 100%;
    position:fixed;
    width:100%;
    height:100%;
    top:0;
    left:0;
  }

  .l-card{
    @include mdc-card-corner-radius(0);

    width: 350px;
    height: 350px;
    padding-top: 30px ;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 15px;
    margin-right: 80px;
    margin-top: 20%;
    margin-left: 33%;
    margin-bottom: 30%;
    position: absolute;
  }

  .l-card button{
    height: 40px;
  }

  .l-card button:focus{
    outline: none;
  }

  .l-title{
    text-align: left;
    font-size: 19px;
    color: #263238;
    margin-bottom: 25px;
  }

  .l-subtitle{
    width: 70%;
    margin-top: 6px;
    font-size: 10px;
    color: #B0BEC5;
  }

  .l-two-buttons{
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .l-two-buttons:not(.r-user-type){
    margin-bottom: 10px;
  }

  .l-card .r-user-type{
    margin-bottom: 10px;
  }

  .l-two-buttons button{
    border: none;
    width: 128px;
    transition: color 0.2s ease, background-color 0.4s ease;
  }

  .greyed-out{
    background: #EDEFF0;
    color: #CFD8DC!important;
  }

  .inactive:hover{
    color: #CBD6DA !important;
  }

  .active:hover{
    color: #546F7A !important;
  }

  .stor-blue{
    background: #03A9F4;
  }

  .google-red{
    background: #dd4b39;
  }

  .facebook-blue{
    background: #3B5998;
  }

  .l-card .mdc-text-field{
    @include mdc-text-field-focused-outline-color(#00B0FF);
    @include mdc-text-field-outline-color(#EDEFF0);

    margin: 2px 0 0 !important;
  }

  .l-card .mdc-text-field--outlined{
    height: 35px;
  }

  .l-card .mdc-text-field__input{
    padding: 0 12px 2px;
  }

  .l-card .mdc-text-field, .r-card .mdc-text-field__input{
    height: 40px;
  }

  .l-card .mdc-notched-outline{
    @include mdc-notched-outline-stroke-width(1px);
  }

  .l-card .mdc-notched-outline,
  .l-card .mdc-notched-outline__idle{
    border-radius: 0;
  }

  .l-card .mdc-notched-outline svg{
    position: relative;
  }

  .l-card .mdc-floating-label{
    color: #CFD8DC !important;
    bottom: 12px;
  }

  .l-card .mdc-floating-label,
  .l-card .mdc-text-field__input{
    font-size: 13px;
  }

  .l-card .mdc-floating-label--float-above{
    transform: translateY(-82%) scale(0.75);
    color: #369FDA !important;
    background-color: white;
    z-index: 2;
  }

  .l-section:not(.r-user-type){
    margin-bottom: 13px;
  }

  .l-terms-section{
    padding-bottom: 6px;
  }

  .l-form .mdc-text-field{
    width: 100%;
  }

  .l-name{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .l-name .mdc-text-field, .l-name .mdc-text-field__input{
    width: 134.5px;
  }

  .l-action{
    margin-top: 20px;
  }

  .l-action .l-two-buttons{
    margin: 0;
  }

  .l-sign-up{
    /*margin-bottom: 20px;*/
    margin-top: 5px;
  }

  .l-social{
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-content: space-evenly;
  }

  .l-social button{
    border: none;
  }

  .l-sign-up button{
    width: 100%;
    border: none;
  }

  .l-button{
    color: white;
    font-size: 14px;
    font-weight: bolder;
    cursor: pointer;
    border-radius: 4px
  }

  .l-heading{
    text-align: left;
    font-size: 14px;
    color: #546F7A;
    padding-top: 10px;
    margin-bottom: 6px;
    margin-left: 15px;
  }

  .l-subheading{
    text-align: left;
    font-size: 10px;
    color: #B0BEC5;
    margin-bottom: 10px;
    margin-left: 15px;
  }

  .r-img{
    padding-top: 20px;
  }

  .r-img-preview{
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #EDEFF0;
    margin: auto auto 30px;
  }

  .r-img-preview img{
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  .r-upload .material-icons{
    font-size: 20px;
  }

  .l-card .l-error{
    color: red !important;
    align-content: center;


  }

  .r5 .r-final{
    width: 100%;
    height: 300px;
    padding-bottom: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .r5 .r-final img{
    width: 100px;
    height: 100px;
  }

  .r5 .err{
    color: red;
  }

  .l-terms{
    font-size: 10px;
    font-weight: 100;
    text-align: center;
    color: #B0BEC5;
    margin: 0;
    padding-top: 6px;
  }

  .l-terms a{
    color: #29B6F6;
  }

</style>
