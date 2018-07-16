<template>
  <div class="overall">
    <m-card class="r-card">
      <div class="r-title">
        Login
        <div class="r-subtitle" v-if="subtitle">
          {{subtitle}}
        </div>
      </div>

      <div class="r-form">
        <div class="r1">
          <div v-for="section in screens.r1.sections"
               :class="[section.id, 'r-section']"
               :key="section.id">

            <m-textfield v-for="field in section.fields"
                         :type="field.type ? field.type : 'text'"
                         :id="field.id"
                         v-model="$data[field.id]"
                         :key="field.id" outlined>

              <m-floating-label :for="field.id">
                {{field.label}}
                <span class="r-error" v-show="r1Errs[field.id]">
                  {{r1Errs[field.id]}}
                </span>
              </m-floating-label>

              <m-notched-outline></m-notched-outline>
            </m-textfield>
          </div>

          <div class="r-terms r-section">
            By signing in you agree to the
            <router-link to="/">Terms and Conditions</router-link>
          </div>
        </div>

      </div>

      <div class="r-sign-up">
        <a href="/api/u/auth/login"><button class="r-button stor-blue">SIGN IN</button></a>
      </div>
      <div class="r-terms r-section">
        Login or Create Account with
      </div>
      <div class="r-two-buttons">
        <a href="/api/u/auth/google"><button class="r-button google-red">GOOGLE</button></a>

        <a href="/api/u/auth/facebook"><button class="r-button facebook-blue">FACEBOOK</button></a>
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


  import config from "../../config";
  import httpStats from "../../../../utils/HttpStats";
  import {rScreens, rProps} from "../main/registration/r.screens";

  Vue.use(Card);
  Vue.use(Button);
  Vue.use(TextField);
  Vue.use(NotchedOutline);
  Vue.use(FloatingLabel);
  Vue.use(Elevation);
  Vue.use(Icon);

  const INVALID = "(invalid)";

  /**
   * Checks if object is empty
   *
   * @param obj object to check
   *
   * @returns {boolean}
   */
  function emptyObj(obj){
    if(!obj) return true;

    return Object.keys(obj).length === 0;
  }

  /**
   * Checks if date is valid
   *
   * @param date questionable date
   *
   * @returns {boolean}
   */
  function validDate(date){
    let regEx = new RegExp("((0?[13578]|10|12)([-\/])((0[0-9])|([12])([0-9]?)" +
      "|(3[01]?))([-\/])((\d{4})|(\d{2}))|(0?[2469]|11)([-\/])((0[0-9])|([12])" +
      "([0-9]?)|(3[0]?))([-\/])((\d{4}|\d{2})))");

    return regEx.test(date);
  }

  export default {
    data(){
      return {
        screens: rScreens,
        screen: "r1",
        userType: "store",
        fName: "",
        lName: "",
        email: "",
        phone: "",
        password: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        suite: "",
        alias: "",
        ssn: "",
        invite: "",
        touched: {},
        err: null
      }
    },

    methods: {
      /**
       * Goes to the next screen in the
       * registration form
       */
      next(){
        let self = this;
        self.touchAll();
      },

      /**
       * Goes to the previous screen
       * in the registration form
       */
      back(){
        let self = this;
        let n = parseInt(self.screen[1]);
        let prev = n - 1;

        if (prev > 0){
          let prevScreen = `r${prev}`;
          let props = rProps[prevScreen] || [];

          if(props.includes("ssn") && self.userType !== "host"){
            prevScreen = `r${prev - 1}`
          }

          self.screen = prevScreen;
        }
      },

      /**
       * Submits the sign up form.
       */
      async submit(){
        let self = this;
        self.next();

        let data = JSON.parse(JSON.stringify(self.$data));
        let keys = Object.keys(data);
        let exclude = new Set(["screen", "screens", "touched", "err", "userType"]);

        for(let key of keys){
          if(exclude.has(key)){
            delete data[key];
          }
        }

        data.firstName = data.fName;
        data.lastName = data.lName;
        data.isRenter = self.userType === "store";
        data.isHost = !data.isRenter;
        data.address = self.address;

        try{
          let res = await self.$http.post("/api/u/auth/login", data);
          let { token } = res.body.result;

          self.$store.commit("token", token);
        }
        catch(err){
          if(err.body){
            self.err = err.body.message;
          }
          else console.log(err);
        }
      },

      /**
       * Validates required fields in
       * the form
       *
       * @param required list of required props
       * @param errs object containing found errors
       */
      checkRequired(required, errs){
        let self = this;

        for(let prop of required){
          if(self.touched[prop]){
            if(!self[prop].trim()){
              errs[prop] = "*";
            }
          }
        }
      },

      /**
       * Marks all fields as touched
       */
      touchAll(){
        let self = this;

        for(let prop of rProps[self.screen]){
          if(!self.touched[prop]){
            self.$set(self.touched, prop, true);
          }
        }
      }
    },

    computed: {
      subtitle(){
        switch(this.screen){
          case "r2": return "Your address will never be shared without your consent";
          case "r3": return "Required for hosts";
        }
      },

      loggedIn(){
        return this.$store.getters.loggedIn;
      },

      /**
       * Errors on the first registration
       * screen
       *
       * @returns {{}}
       */
      r1Errs(){
        let self = this;
        let touched = self.touched;
        let optional = new Set(["invite"]);
        let required = rProps.r1.filter(prop => !optional.has(prop));
        let errs = {};

        if(touched.email && !validator.isEmail(self.email)){
          errs["email"] = INVALID;
        }

        if(touched.phone && !validator.isMobilePhone(self.phone, "en-US")){
          errs.phone = INVALID
        }

        if(touched.password && self.password.length < config.MIN_PASS_LENGTH){
          errs.password = `(${config.MIN_PASS_LENGTH} characters minimum)`
        }

        self.checkRequired(required, errs);

        return errs;
      },
    },

    mounted(){
      let self = this;

      // mark field as touched once clicked
      $(".mdc-text-field input").on("click.touched", function(){
        let elem = this;

        if(!self.touched[elem.id]){
          self.$set(self.touched, elem.id, true);
        }

        // remove click listener
        $(`.mdc-text-field #${elem.id}`).off("click.touched");
      });

      /**
       * Reads an uploaded file
       *
       * @param input
       */
      function readURL(input) {
        if (input.files && input.files[0]) {
          let reader = new FileReader();
          let img = $('.r-img-preview img');

          reader.onload = function (e) {
            img.attr('src', e.target.result);
          };

          reader.readAsDataURL(input.files[0]);
        }
      }

      /**
       * Updates the image when file input
       * changes
       */
      $("#r-upload-img").change(function(){
        let img = $('.r-img-preview img');

        readURL(this);
        img.css({opacity: 1});
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
    margin-bottom: 25px;
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
    margin-right: 3px;
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
