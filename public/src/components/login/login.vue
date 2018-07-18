<template>
  <div class="overall">
    <m-card class="r-card">
      <div class="r-title">
       Sign In
      </div>

      <div class="r-form">
        <div class="r1">
          <div class="r-section">

            <m-textfield v-model="alias" outlined>

              <m-floating-label>
                Username
              </m-floating-label>

              <m-notched-outline></m-notched-outline>
            </m-textfield>
          </div>

          <div class="r-section">

            <m-textfield type="password" v-model="password" outlined>

              <m-floating-label>
                Password

              </m-floating-label>

              <m-notched-outline></m-notched-outline>
            </m-textfield>
          </div>

          <span class="r-error r-terms r-section" v-if="errMsg">
                  {{errMsg}}
          </span>

        </div>

      </div>

      <div class="r-sign-up">
        <button @click="login" class="r-button stor-blue">SIGN IN</button>
      </div>
      <div class="r-terms r-section">
        Login with
      </div>
      <div class="r-two-buttons">
        <a href="/api/u/auth/facebook"><button class="r-button facebook-blue">FACEBOOK</button></a>

        <a href="/api/u/auth/google"><button class="r-button google-red">GOOGLE</button></a>
      </div>
      <div class="r-terms r-section">
        Don't have an account?
        <router-link to="/">Sign Up </router-link>
      </div>
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
  import validator from "validator";


  import config from "../../../../config";


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

        try {
          let credentials = {alias, password};
          let loginRoute = `${config.BASE_URL}/api/u/auth/login`;
          let res = await self.$http.post(loginRoute, credentials);

          console.log(res);

          self.loggedIn(res);
        }
        catch (err) {
          self.errMsg = "Invalid Credentials";
          console.log(err);
        }
      },

      /**
       * Validates required fields in
       * the form
       *
       * @param required list of required props
       * @param errs object containing found errors
       */
      checkRequired(required, errs) {
        let self = this;

        for (let prop of required) {
          if (self.touched[prop]) {
            if (!self[prop].trim()) {
              errs[prop] = "*";
            }
          }
        }
      },
    },

    computed: {
      loggedIn() {
        return this.$store.getters.loggedIn;
      }
    },
    mounted() {
      let self = this;

      // mark field as touched once clicked
      $(".mdc-text-field input").on("click.touched", function () {
        let elem = this;

        if (!self.touched[elem.id]) {
          self.$set(self.touched, elem.id, true);
        }

        // remove click listener
        $(`.mdc-text-field #${elem.id}`).off("click.touched");
      });
    }
  }

</script>

<style lang="scss">
  @import "../../../node_modules/material-components-vue/dist/card/styles";
  @import "../../../node_modules/material-components-vue/dist/button/styles";
  @import "../../../node_modules/material-components-vue/dist/textfield/styles";
  @import "../../../node_modules/material-components-vue/dist/notched-outline/styles";
  @import "../../../node_modules/material-components-vue/dist/floating-label/styles";
  @import "../../../node_modules/material-components-vue/dist/elevation/styles";

  .overall{
    display: flex;
    justify-content: center;
    align-content: center;
  }
  .r-card{
    @include mdc-card-corner-radius(0);

    width: 330px;
    padding: 30px 30px;
    margin-right: 80px;
    position: relative;
    top: 100px;

  }

  .r-card button{
    height: 40px;
  }

  .r-card button:focus{
    outline: none;
  }

  .r-title{
    text-align: left;
    font-size: 19px;
    color: #263238;
    margin-bottom: 25px;
  }

  .r-subtitle{
    width: 70%;
    margin-top: 6px;
    font-size: 10px;
    color: #B0BEC5;
  }

  .r-two-buttons{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .r-two-buttons:not(.r-user-type){
    margin-bottom: 20px;
  }

  .r-card .r-user-type{
    margin-bottom: 10px;
  }

  .r-two-buttons button{
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

  .r-card .mdc-text-field{
    @include mdc-text-field-focused-outline-color(#00B0FF);
    @include mdc-text-field-outline-color(#EDEFF0);

    margin: 2px 0 0 !important;
  }

  .r-card .mdc-text-field--outlined{
    height: 35px;
  }

  .r-card .mdc-text-field__input{
    padding: 0 12px 2px;
  }

  .r-card .mdc-text-field, .r-card .mdc-text-field__input{
    height: 40px;
  }

  .r-card .mdc-notched-outline{
    @include mdc-notched-outline-stroke-width(1px);
  }

  .r-card .mdc-notched-outline,
  .r-card .mdc-notched-outline__idle{
    border-radius: 0;
  }

  .r-card .mdc-notched-outline svg{
    position: relative;
  }

  .r-card .mdc-floating-label{
    color: #CFD8DC !important;
    bottom: 12px;
  }

  .r-card .mdc-floating-label,
  .r-card .mdc-text-field__input{
    font-size: 13px;
  }

  .r-card .mdc-floating-label--float-above{
    transform: translateY(-82%) scale(0.75);
    color: #369FDA !important;
    background-color: white;
    z-index: 2;
  }

  .r-section:not(.r-user-type){
    margin-bottom: 13px;
  }

  .r-form .mdc-text-field{
    width: 100%;
  }

  .r-name{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .r-name .mdc-text-field, .r-name .mdc-text-field__input{
    width: 134.5px;
  }

  .r-action{
    margin-top: 20px;
  }

  .r-action .r-two-buttons{
    margin: 0;
  }

  .r-sign-up{
    /*margin-bottom: 20px;*/
  }

  .r-sign-up button{
    width: 100%;
    border: none;
  }

  .r-button{
    color: white;
    font-size: 14px;
    font-weight: bolder;
    cursor: pointer;
  }

  .r-heading{
    text-align: left;
    font-size: 14px;
    color: #546F7A;
    padding-top: 10px;
    margin-bottom: 6px;
    margin-left: 15px;
  }

  .r-subheading{
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

  #r-upload-img{
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  #r-upload-img + label{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    border: none;
  }

  #r-upload-img + label span{
    margin: 0 8px;
  }

  .r-card .r-error{
    color: red !important;


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

  .r-terms{
    font-size: 7px;
    font-weight: 100;
    text-align: center;
    color: #B0BEC5;
    margin: 0;
    padding-top: 6px;
  }

  .r-terms a{
    color: #29B6F6;
  }

</style>
