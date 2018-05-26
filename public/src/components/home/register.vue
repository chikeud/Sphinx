<template>
  <m-card class="r-card">
    <div class="r-title">
      Sign Up Today
    </div>

    <div class="r-form">
      <div class="r1" v-if="screen == 'r1'">
        <div class="r-user-type r-two-buttons">
          <button @click="setUserType('host')" id="r-host" class="r-button greyed-out active">
            HOST
          </button>
          <button @click="setUserType('store')" id="r-store" class="r-button stor-blue">
            STORE
          </button>
        </div>

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

      <div class="r2" v-if="screen == 'r2'">

      </div>
    </div>

    <div class="r-action">
      <div class="r-sign-up" v-if="screen == 'r1'">
        <button @click="next" class="r-button stor-blue">Sign Up</button>
      </div>

      <div class="r-two-buttons" v-else>
        <button @click="back" class="r-button stor-blue">Back</button>
        <button @click="next" class="r-button stor-blue">Next</button>
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

  Vue.use(Card);
  Vue.use(Button);
  Vue.use(TextField);
  Vue.use(NotchedOutline);
  Vue.use(FloatingLabel);
  Vue.use(Elevation);

  export default {
    data(){
      return {
        screen: "r1",
        userType: "",
        fName: "",
        lName: "",
        email: "",
        phone: "",
        password: "",
        city: ""
      }
    },

    methods: {
      next(){
        let self = this;
        let numScreens = 4;
        let n = parseInt(self.screen[1]);
        let next = n + 1;

        if (next <= numScreens){
          self.screen = `r${next}`;
        }
      },

      back(){
        let self = this;
        let n = parseInt(self.screen[1]);
        let prev = n - 1;

        if (prev > 0){
          self.screen = `r${prev}`;
        }
      },

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

  .r-action{
    margin-top: 30px;
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
</style>
