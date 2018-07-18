<template>
  <m-card class="r-card">
    <div class="r-title">
      {{title}}

      <div class="r-subtitle" v-if="subtitle">
        {{subtitle}}
      </div>
    </div>

    <div class="r-form">
      <div class="r1" v-show="screen === 'r1'">
        <div class="r-user-type r-section r-two-buttons">
          <button @click="setUserType('host')" id="r-host" class="r-button greyed-out active">
            HOST
          </button>
          <button @click="setUserType('store')" id="r-store" class="r-button stor-blue">
            RENT
          </button>
        </div>

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
          By clicking "create account" you agree to the
          <router-link to="/">Terms and Conditions</router-link>
        </div>
      </div>

      <div class="r2" v-show="screen === 'r2'">
        <div v-for="section in screens.r2.sections"
             :class="[section.id, 'r-section']"
             :key="section.id">

          <div v-if="section.heading" class="r-heading">
            {{section.heading}}
          </div>

          <div v-if="section.subHeading" class="r-subheading">
            {{section.subHeading}}
          </div>
          <!--TODO tie values to address model-->
          <m-textfield v-for="field in section.fields"
                       :id="field.id"
                       v-model="$data[field.id]"
                       :key="field.id" outlined>

            <m-floating-label :for="field.id">
              {{field.label}}
              <span class="r-error" v-show="r2Errs[field.id]">
                {{r2Errs[field.id]}}
              </span>
            </m-floating-label>

            <m-notched-outline></m-notched-outline>
          </m-textfield>
        </div>

      </div>

      <div class="r3" v-show="screen === 'r3'">
        <div v-for="section in screens.r3.sections"
             :class="[section.id, 'r-section']"
             :key="section.id">

          <m-textfield v-for="field in section.fields"
                       :id="field.id" v-model="$data[field.id]"
                       :key="field.id" outlined>

            <m-floating-label :for="field.id">
              {{field.label}}
              <span class="r-error" v-show="r3Errs[field.id]">
                {{r3Errs[field.id]}}
              </span>
            </m-floating-label>

            <m-notched-outline></m-notched-outline>
          </m-textfield>
        </div>
      </div>

      <div class="r4" v-show="screen === 'r4'">
        <div class="r-img r-section">
          <div class="r-img-preview">
            <img src="" onerror="this.style.opacity='0'">
          </div>

          <div class="r-upload">
            <input id="r-upload-img" type="file"/>
            <label for="r-upload-img" class="r-button stor-blue">
              <m-icon icon="cloud_upload"></m-icon>
              <span>Profile Image</span>
            </label>
          </div>
        </div>

        <div v-for="section in screens.r4.sections"
             :class="[section.id, 'r-section']"
             :key="section.id">

          <m-textfield v-for="field in section.fields"
                       :id="field.id" v-model="$data[field.id]"
                       :key="field.id" outlined>

            <m-floating-label :for="field.id">
              {{field.label}}
              <span class="r-error" v-show="r4Errs[field.id]">
                {{r4Errs[field.id]}}
              </span>
            </m-floating-label>

            <m-notched-outline></m-notched-outline>
          </m-textfield>
        </div>      </div>

      <div class="r5" v-show="screen === 'r5'">
        <div class="r-final">
          <img v-if="!loggedIn" src="/src/assets/stor-loading.gif"/>
          <div v-else>
            Welcome to Stör!
          </div>
          <div v-if="err" class="err">
            {{err}}
          </div>
        </div>
      </div>
    </div>

    <div class="r-action" v-if="screen !== 'r5'">
      <div class="r-sign-up" v-if="screen === 'r1'">
        <button @click="next" class="r-button stor-blue">CREATE ACCOUNT</button>
      </div>

      <div class="r-two-buttons" v-else>
        <button @click="back" class="r-button stor-blue">BACK</button>

        <button @click="submit" class="r-button stor-blue" v-if="screen === 'r4'">SUBMIT</button>
        <button @click="next" class="r-button stor-blue" v-else>NEXT</button>
      </div>
    </div>
  </m-card>
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

  import config from "../../../config";
  import httpStats from "../../../../../utils/HttpStats";
  import {rScreens, rProps} from "./r.screens";

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

  /**
   * Checks if a string is a valid US
   * zip code
   *
   * @param zip zip code
   *
   * @returns {boolean}
   */
  function isValidUSZip(zip) {
    return /^\d{5}(-\d{4})?$/.test(zip);
  }

  /**
   * Checks if a string is a valid ssn
   *
   * @param ssn string to check
   *
   * @returns {boolean}
   */
  function isValidSSN(ssn) {
    return /^\d{3}-?\d{2}-?\d{4}$/.test(ssn);
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
        let numScreens = 5;
        let n = parseInt(self.screen[1]);
        let next = n + 1;

        self.touchAll();

        if(emptyObj(self[`${self.screen}Errs`]) && next <= numScreens){
          let nextScreen = `r${next}`;
          let props = rProps[nextScreen] || [];

          if(props.includes("ssn") && self.userType !== "host"){
            nextScreen = `r${next + 1}`
          }

          self.screen = nextScreen;
        }
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

        let profileImage = $("#r-upload-img")[0].files[0];

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
          let res = await self.$http.post("/api/u", data);
          let {token} = res.body.result;

          if(profileImage){
            let formData = new FormData();
            let options = {headers:{}};

            options.headers[config.AUTH_TOKEN] = token;

            formData.append("profileImg", profileImage);

            try{
              await self.$http.post("/api/u/img", formData, options);
            }
            catch(err){
              if(err.status === httpStats.BAD_REQUEST){
                self.err = "invalid image"
              }
              else self.err = err.body.message;
            }
          }
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
       * Sets the user type.
       * Used for the "Store" and "Host"
       * buttons
       *
       * @param type
       */
      setUserType(type){
        let types = ["host", "store"];
        let valid = new Set(types);

        if (!valid.has(type)){
          throw new Error("Invalid user type!");
        }

        let self = this;

        if(type === self.userType){return;}

        let elem = $(`#r-${type}`);
        let other = type === types[0]? types[1] : types[0];
        other = $(`#r-${other}`);

        elem.removeClass("greyed-out");
        elem.removeClass("active");
        elem.addClass("stor-blue");

        other.addClass("greyed-out");
        other.addClass("active");
        other.removeClass("stor-blue");

        self.userType = type;
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
      title(){
        switch(this.screen){
          case "r1": return "Sign Up Today";
          case "r2": return "Address";
          case "r3": return "SSN";
          case "r4": return "Final Step"
        }
      },

      subtitle(){
        switch(this.screen){
          case "r2": return "Your address will never be shared without your consent";
          case "r3": return "Required for hosts";
        }
      },

      address(){
        let self = this;

        return {
          city: self.city,
          street: self.street,
          houseNum: self.suite,
          state: self.state,
          zip: self.zip
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

      /**
       * Errors on the second registration
       * screen
       *
       * @returns {{}}
       */
      r2Errs(){
        let self = this;
        let optional = new Set(["suite"]);
        let required = rProps.r2.filter(prop => !optional.has(prop));
        let errs = {};

        if(self.touched.zip && !isValidUSZip(self.address.zip)){
          errs.zip = INVALID;
        }

        self.checkRequired(required, errs);

        return errs;
      },

      /**
       * Errors on the third registration
       * screen
       *
       * @returns {{}}
       */
      r3Errs(){
        let self = this;
        let required = rProps.r3;
        let errs = {};

        if(self.touched.ssn && !isValidSSN(self.ssn)){
          errs.ssn = INVALID;
        }

        self.checkRequired(required, errs);

        return errs;
      },

      r4Errs(){
        let self =  this;
        let errs = {};

        if(self.touched.alias && self.alias.length < 2){
          errs.alias = "(2 characters minimum)";
        }

        return errs;
      }
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
  @import "../../../../node_modules/material-components-vue/dist/card/styles";
  @import "../../../../node_modules/material-components-vue/dist/button/styles";
  @import "../../../../node_modules/material-components-vue/dist/textfield/styles";
  @import "../../../../node_modules/material-components-vue/dist/notched-outline/styles";
  @import "../../../../node_modules/material-components-vue/dist/floating-label/styles";
  @import "../../../../node_modules/material-components-vue/dist/elevation/styles";

  .r-card{
    @include mdc-card-corner-radius(0);

    width: 330px;
    padding: 30px 30px;
    margin-right: 80px;
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
