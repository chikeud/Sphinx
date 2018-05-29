<template>
  <m-card class="r-card">
    <div class="r-title">
      Sign Up Today
    </div>

    <div class="r-form">
      <div class="r1" v-show="screen == 'r1'">
        <div class="r-user-type r-two-buttons">
          <button @click="setUserType('host')" id="r-host" class="r-button greyed-out active">
            HOST
          </button>
          <button @click="setUserType('store')" id="r-store" class="r-button stor-blue">
            STORE
          </button>
        </div>

        <div class="r-name r-section">
          <m-textfield outlined id="fName" v-model="fName">
            <m-floating-label for="fName">
              First Name <span class="r-error" v-show="r1Errs.fName">{{r1Errs.fName}}</span>
            </m-floating-label>
            <m-notched-outline></m-notched-outline>
          </m-textfield>

          <m-textfield outlined id="lName" v-model="lName">
            <m-floating-label for="lName">
              Last Name <span class="r-error" v-show="r1Errs.lName">{{r1Errs.lName}}</span>
            </m-floating-label>
            <m-notched-outline></m-notched-outline>
          </m-textfield>
        </div>

        <div class="r-contact r-section">
          <m-textfield outlined id="email" v-model="email">
            <m-floating-label for="email">
              Email <span class="r-error" v-show="r1Errs.email">{{r1Errs.email}}</span>
            </m-floating-label>
            <m-notched-outline></m-notched-outline>
          </m-textfield>

          <m-textfield outlined id="phone" v-model="phone">
            <m-floating-label for="phone">
              Phone <span class="r-error" v-show="r1Errs.phone">{{r1Errs.phone}}</span>
            </m-floating-label>
            <m-notched-outline></m-notched-outline>
          </m-textfield>

          <m-textfield outlined id="password" type="password" v-model="password">
            <m-floating-label for="password">
              Password <span class="r-error" v-if="r1Errs.password">{{r1Errs.password}}</span>
            </m-floating-label>
            <m-notched-outline></m-notched-outline>
          </m-textfield>
        </div>

        <div class="r-city r-section">
          <m-textfield outlined id="city" v-model="address.city">
            <m-floating-label for="city">
              City <span class="r-error" v-show="r1Errs.city">{{r1Errs.city}}</span>
            </m-floating-label>
            <m-notched-outline></m-notched-outline>
          </m-textfield>
        </div>
      </div>

      <div class="r2" v-show="screen == 'r2'">
        <div class="r-address r-section">
          <div class="r-heading">Address</div>

          <m-textfield outlined id="street" v-model="address.street">
            <m-floating-label for="street">
              Street <span class="r-error" v-show="r2Errs.street">{{r2Errs.street}}</span>
            </m-floating-label>
            <m-notched-outline></m-notched-outline>
          </m-textfield>

          <m-textfield outlined id="suite" v-model="address.suite">
            <m-floating-label for="suite">Suite (Optional)</m-floating-label>
            <m-notched-outline></m-notched-outline>
          </m-textfield>

          <m-textfield outlined id="state" v-model="address.state">
            <m-floating-label for="state">
              State <span class="r-error" v-show="r2Errs.state">{{r2Errs.state}}</span>
            </m-floating-label>
            <m-notched-outline></m-notched-outline>
          </m-textfield>

          <m-textfield outlined id="zip" v-model="address.zip">
            <m-floating-label for="zip">
              Zip Code <span class="r-error" v-show="r2Errs.zip">{{r2Errs.zip}}</span>
            </m-floating-label>
            <m-notched-outline></m-notched-outline>
          </m-textfield>
        </div>

        <div class="r-username r-section">
          <div class="r-heading">Username</div>

          <div class="r-subheading">
            Will be used in your profile url
          </div>

          <m-textfield outlined id="alias" v-model="alias">
            <m-floating-label for="alias">
              Username <span class="r-error" v-show="r2Errs.alias">{{r2Errs.alias}}</span>
            </m-floating-label>
            <m-notched-outline></m-notched-outline>
          </m-textfield>
        </div>
      </div>

      <div class="r3" v-show="screen == 'r3'">
        <div class="r-ssn r-section">
          <div class="r-heading">SSN</div>

          <div class="r-subheading">
            Required for hosts
          </div>

          <m-textfield outlined id="ssn" v-model="ssn">
            <m-floating-label for="ssn">
              xxx-xx-xxxx <span class="r-error" v-show="r3Errs.ssn">{{r3Errs.ssn}}</span>
            </m-floating-label>
            <m-notched-outline></m-notched-outline>
          </m-textfield>
        </div>
      </div>

      <div class="r4" v-show="screen == 'r4'">
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

        <div class="r-invite r-section">
          <m-textfield outlined id="invite" v-model="invite">
            <m-floating-label for="invite">Invite Code (Optional)</m-floating-label>
            <m-notched-outline></m-notched-outline>
          </m-textfield>
        </div>
      </div>

      <div class="r5" v-show="screen == 'r5'">
      </div>
    </div>

    <div class="r-action">
      <div class="r-sign-up" v-if="screen == 'r1'">
        <button @click="next" class="r-button stor-blue">Sign Up</button>
      </div>

      <div class="r-two-buttons" v-else>
        <button @click="back" class="r-button stor-blue">Back</button>

        <button @click="next" class="r-button stor-blue" v-if="screen == 'r4'">Submit</button>
        <button @click="next" class="r-button stor-blue" v-else>Next</button>
      </div>
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
  import Icon from "material-components-vue/dist/icon"
  import validator from "validator"

  Vue.use(Card);
  Vue.use(Button);
  Vue.use(TextField);
  Vue.use(NotchedOutline);
  Vue.use(FloatingLabel);
  Vue.use(Elevation);
  Vue.use(Icon);

  const INVALID = "(invalid)";

  // properties grouped by screen
  let rProps = {
    r1: [
      "userType", "fName", "lName", "email",
      "phone", "password", "city"
    ],

    r2: [
      "street", "suite", "state", "zip", "alias"
    ],

    r3: ["ssn"],

    r4: ["invite"]
  };

  /**
   * Checks if object is empty
   *
   * @param obj object to check
   *
   * @returns {boolean}
   */
  function emptyObj(obj){
    return Object.keys(obj).length === 0;
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
        screen: "r1",
        userType: "store",
        fName: "",
        lName: "",
        email: "",
        phone: "",
        password: "",
        address: {
          street: "",
          city: "",
          state: "",
          zip: "",
          suite: ""
        },
        alias: "",
        ssn: "",
        invite: "",
        touched: {}
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

        if (emptyObj(self[`${self.screen}Errs`]) && next <= numScreens){
          self.screen = `r${next}`;
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
          self.screen = `r${prev}`;
        }
      },

      /**
       * Submits the sign up form.
       */
      submit(){

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
        let addressProps = new Set(["city", "street", "suite", "state", "zip"]);
        let aProp;
        let data;

        for(let prop of required){
          if(self.touched[prop]){
            aProp = addressProps.has(prop);
            data = aProp ? self.address : self;

            if(!data[prop].trim()){
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
      /**
       * Errors on the first registration
       * screen
       *
       * @returns {{}}
       */
      r1Errs(){
        let self = this;
        let touched = self.touched;
        let required = rProps.r1;
        let errs = {};

        if(touched.email && !validator.isEmail(self.email)){
          errs["email"] = INVALID;
        }

        if(touched.phone && !validator.isMobilePhone(self.phone, "en-US")){
          errs.phone = INVALID
        }

        if(touched.password && self.password.length < 6){
          errs.password = "(6 characters minimum)"
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

        if(self.touched.alias && self.alias.length < 2){
          errs.alias = "(2 characters minimum)";
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

        console.log("clicked", elem.id);

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
  @import "~material-components-vue/dist/card/styles";
  @import "~material-components-vue/dist/button/styles";
  @import "~material-components-vue/dist/textfield/styles";
  @import "~material-components-vue/dist/notched-outline/styles";
  @import "~material-components-vue/dist/floating-label/styles";
  @import "~material-components-vue/dist/elevation/styles";

  .r-card{
    @include mdc-card-corner-radius(0);

    width: 330px;
    padding: 20px 40px;
    margin-right: 80px;
  }

  .r-card button:focus{
    outline: none;
  }

  .r-title{
    text-align: left;
    font-size: 19px;
    margin-bottom: 25px;
  }

  .r-two-buttons{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .r-two-buttons button{
    border: none;
    width: 120px;
    height: 35px;
    transition: color 0.2s ease, background-color 0.4s ease;
  }

  .greyed-out{
    background: #EBEFF1;
    color: #CBD6DA !important;
  }

  .inactive:hover{
    color: #CBD6DA !important;
  }

  .active:hover{
    color: #369FDA !important;
  }

  .stor-blue{
    background: #369FDA;
  }

  .r-card .mdc-text-field{
    @include mdc-text-field-focused-outline-color(#369FDA);
    @include mdc-text-field-outline-color(#EBEFF1);

    margin: 2px 0 0 !important;
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
    background-color: white;
    z-index: 2;
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

  .r-action{
    margin-top: 30px;
  }

  .r-sign-up{
    margin-bottom: 20px;
  }

  .r-sign-up button{
    width: 100%;
    height: 35px;
    border: none;
  }

  .r-button{
    color: white;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
  }

  .r-heading{
    text-align: left;
    font-size: 14px;
    padding-top: 10px;
    margin-bottom: 10px;
  }

  .r-subheading{
    text-align: left;
    font-size: 10px;
    margin-bottom: 10px;
  }

  .r-img{
    padding-top: 20px;
  }

  .r-img-preview{
    width: 150px;
    height: 140px;
    border-radius: 50%;
    background-color: lightgray;
    margin: auto auto 30px;
  }

  .r-img-preview img{
    width: 150px;
    height: 150px;
    border-radius: 50%;
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
    height: 35px;
    border: none;
  }

  #r-upload-img + label span{
    margin: 0 8px;
  }

  .r-card .r-error{
    color: red !important;
    font-size: 12px;
    margin-right: 3px;
  }

</style>
