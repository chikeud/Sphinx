<template>
  <div id="settings">
    <m-card class="public-settings">
      <div class="settings-title" @click="active = 'public-settings'">
        Public
      </div>

      <div class="settings-content" v-show="active === 'public-settings'">
        <hr>

        <m-layout-grid :align="'left'" class="grid image-settings-grid">
          <m-layout-grid-inner class="inner-grid">

            <m-layout-grid-cell :span=12>
              <div class="settings-image">
                <div class="preview">
                  <img v-if="profileImg" :src="profileImg.url"/>
                </div>

                <div class="prompt">
                  <div class="heading">Change Profile Image</div>
                  <span>Please crop your image to a square for best results</span>
                </div>

                <div>
                  <input type="file" @change="addFile" id="settings-img-upload"/>
                  <label for="settings-img-upload">UPLOAD</label>
                </div>
              </div>
            </m-layout-grid-cell>

          </m-layout-grid-inner>
        </m-layout-grid>

        <hr>

        <m-layout-grid :align="'left'" class="grid info-settings-grid">
          <m-layout-grid-inner class="inner-grid">
            <m-layout-grid-cell :span="12">
              <div class="prompt">
                <div class="heading">Basic Information</div>
                <span>Will only be shared with potential hosts and renters</span>
              </div>
            </m-layout-grid-cell>

            <m-layout-grid-cell :spanDesktop="4" :spanTablet="5" :spanPhone="4">
              <m-textfield class="settings-input" outlined v-model="firstName" id="firstname-settings">
                <m-floating-label for="firstname-settings">
                  First Name
                </m-floating-label>

                <m-notched-outline class="settings-input-outline"></m-notched-outline>
              </m-textfield>
            </m-layout-grid-cell>

            <m-layout-grid-cell :spanDesktop="4" :spanTablet="5" :spanPhone="4">
              <m-textfield class="settings-input" outlined v-model="lastName" id="lastname-settings">
                <m-floating-label for="lastname-settings">
                  Last Name
                </m-floating-label>

                <m-notched-outline class="settings-input-outline"></m-notched-outline>
              </m-textfield>
            </m-layout-grid-cell>

            <m-layout-grid-cell :spanDesktop="4" :spanTablet="5" :spanPhone="4">
              <m-textfield class="settings-input" outlined v-model="alias" id="alias-settings">
                <m-floating-label for="alias-settings">
                  Username
                </m-floating-label>

                <m-notched-outline class="settings-input-outline"></m-notched-outline>
              </m-textfield>
            </m-layout-grid-cell>

            <m-layout-grid-cell :span="12">
              <m-textfield textarea v-model="bio" id="bio-settings">
                <m-floating-label for="bio-settings">
                  Bio (500 char  max)
                </m-floating-label>
              </m-textfield>
            </m-layout-grid-cell>

          </m-layout-grid-inner>
        </m-layout-grid>

        <hr>

        <div class="settings-submit">
          <button>SAVE</button>
        </div>

      </div>
    </m-card>
    <m-card class="private-settings">
      <div class="settings-title" @click="active = 'private-settings'">
        Private
      </div>

      <div class="settings-content" v-show="active === 'private-settings'">

        <hr>

        <m-layout-grid :align="'left'" class="grid address-settings-grid">
          <m-layout-grid-inner class="inner-grid">
            <m-layout-grid-cell :span="12">
              <div class="prompt">
                <div class="heading">Address Information</div>
                <span>Will only be shared with your renters</span>
              </div>
            </m-layout-grid-cell>

            <m-layout-grid-cell :spanDesktop="4" :spanTablet="5" :spanPhone="4">
              <m-textfield class="settings-input" outlined v-model="address.street" id="street-settings">
                <m-floating-label for="street-settings">
                  Street
                </m-floating-label>

                <m-notched-outline class="settings-input-outline"></m-notched-outline>
              </m-textfield>
            </m-layout-grid-cell>

            <m-layout-grid-cell :spanDesktop="4" :spanTablet="5" :spanPhone="4">
              <m-textfield class="settings-input" outlined v-model="address.suite" id="suite-settings">
                <m-floating-label for="suite-settings">
                  Suite (Optional)
                </m-floating-label>

                <m-notched-outline class="settings-input-outline"></m-notched-outline>
              </m-textfield>
            </m-layout-grid-cell>

            <m-layout-grid-cell class="city-select" :spanDesktop="4" :spanTablet="5" :spanPhone="4">
              <m-select outlined v-model="address.city" id="city-settings">
                <option :key="'rochester'"
                        :value="'Rochester'">Rochester</option>

                <m-floating-label
                  slot="label">
                  City
                </m-floating-label>

                <m-notched-outline class="select-input-outline" slot="line"></m-notched-outline>
              </m-select>
            </m-layout-grid-cell>

            <m-layout-grid-cell :spanDesktop="4" :spanTablet="5" :spanPhone="4">
              <m-textfield class="settings-input" outlined v-model="address.zip" id="zip-settings">
                <m-floating-label for="zip-settings">
                  Zip Code
                </m-floating-label>

                <m-notched-outline class="settings-input-outline"></m-notched-outline>
              </m-textfield>
            </m-layout-grid-cell>

            <m-layout-grid-cell :spanDesktop="4" :spanTablet="5" :spanPhone="4">
              <m-textfield class="settings-input" outlined v-model="address.state" id="state-settings">
                <m-floating-label for="state-settings">
                  State
                </m-floating-label>

                <m-notched-outline class="settings-input-outline"></m-notched-outline>
              </m-textfield>
            </m-layout-grid-cell>

          </m-layout-grid-inner>
        </m-layout-grid>

        <hr>

        <m-layout-grid :align="'left'" class="grid password-settings-grid">
          <m-layout-grid-inner class="inner-grid">
            <m-layout-grid-cell :span="12">
              <div class="prompt">
                <div class="heading">Change Password</div>
                <span>
                  For the safety of your account, choose a sufficiently long password
                </span>
              </div>
            </m-layout-grid-cell>

            <m-layout-grid-cell :spanDesktop="4" :spanTablet="5" :spanPhone="4">
              <m-textfield class="settings-input" outlined type="password" v-model="currPassword" id="curr-password">
                <m-floating-label for="curr-password">
                  Current Password
                </m-floating-label>

                <m-notched-outline class="settings-input-outline"></m-notched-outline>
              </m-textfield>
            </m-layout-grid-cell>


            <m-layout-grid-cell :spanDesktop="4" :spanTablet="5" :spanPhone="4">
              <m-textfield class="settings-input" outlined type="password" v-model="newPassword" id="new-password">
                <m-floating-label for="new-password">
                  New Password
                </m-floating-label>

                <m-notched-outline class="settings-input-outline"></m-notched-outline>
              </m-textfield>
            </m-layout-grid-cell>


            <m-layout-grid-cell :spanDesktop="4" :spanTablet="5" :spanPhone="4">
              <m-textfield class="settings-input" outlined type="password" v-model="confirmPassword" id="confirm-password">
                <m-floating-label for="confirm-password">
                  Confirm Password
                </m-floating-label>

                <m-notched-outline class="settings-input-outline"></m-notched-outline>
              </m-textfield>
            </m-layout-grid-cell>

          </m-layout-grid-inner>
        </m-layout-grid>

        <hr>

        <div class="settings-submit">
          <button>SAVE</button>
        </div>

      </div>
    </m-card>
    <m-card class="payment-settings">
      <div class="settings-title">Payment</div>
    </m-card>
  </div>
</template>

<script>
  import Vue from "vue";
  import Card from "material-components-vue/dist/card";
  import Elevation from "material-components-vue/dist/elevation"
  import LayoutGrid from "material-components-vue/dist/layout-grid"
  import TextField from "material-components-vue/dist/textfield"
  import Select from "material-components-vue/dist/select"
  import FloatingLabel from "material-components-vue/dist/floating-label"
  import NotchedOutline from "material-components-vue/dist/notched-outline"
  import Icon from "material-components-vue/dist/icon";

  import {readFiles} from "../../../../public.utils.js"

  Vue.use(Card);
  Vue.use(Elevation);
  Vue.use(LayoutGrid);
  Vue.use(TextField);
  Vue.use(Select);
  Vue.use(FloatingLabel);
  Vue.use(NotchedOutline);
  Vue.use(Icon);

  export default {
    data(){
      return {
        active: "public-settings",
        profileImg: null,
        firstName: "",
        lastName: "",
        alias: "",
        bio: "",
        address: {
          street: "",
          suite: "",
          city: "",
          state: "",
          zip: ""
        },
        currPassword: "",
        newPassword: "",
        confirmPassword: ""
      };
    },

    methods: {
      /**
       * Adds a file from the input to internal list
       * of files
       *
       * @param event - input change event
       * @returns {Promise<void>}
       */
      async addFile(event){
        let self = this;

        try{
          let files = await readFiles(event.target);

          if (files.length){
            self.profileImg = files[0];
          }
          else{
            self.profileImg = null;
          }
        }
        catch(err){
          console.log("File Upload Error:", err);
        }
      },

    }
  }
</script>

<style lang="scss">
  @import "../../../../../node_modules/material-components-vue/dist/card/styles";
  @import "../../../../../node_modules/material-components-vue/dist/elevation/styles";
  @import "../../../../../node_modules/material-components-vue/dist/layout-grid/styles";
  @import "../../../../../node_modules/material-components-vue/dist/textfield/styles";
  @import "../../../../../node_modules/material-components-vue/dist/select/styles";
  @import "../../../../../node_modules/material-components-vue/dist/floating-label/styles";
  @import "../../../../../node_modules/material-components-vue/dist/notched-outline/styles";

  $stor-blue: #03A9F4;
  $item-gray: #EDEFF0;
  $font-gray: #546F7A;
  $text-font-size: 12px !important;

  #settings{
    font-size: 12px;
    color: $font-gray;
  }

  #settings .mdc-card{
    margin-bottom: 15px;
    max-width: 1200px;
  }

  #settings .inner-grid{
    grid-gap: 10px;
  }

  #settings .settings-title{
    display: flex;
    align-items: center;
    height: 56px;
    padding: 0 15px;
    font-size: 14px;
    color: black;
    cursor: pointer;
  }

  #settings hr{
    border: none;
    margin: 0;
    height: 2px;
    background: $item-gray;
  }

  #settings .heading{
    font-size: 14px;
    color: black;
    margin-bottom: 5px;
  }

  #settings .settings-image{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  #settings .preview{
    width: 100px;
    height: 100px;
    flex-shrink: 0;
    border-radius: 50%;
    background: $item-gray;
    margin-right: 16px;
    margin-bottom: 16px;
  }

  #settings .preview img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }

  #settings .prompt{
    min-width: 150px;
    max-width: 230px;
    margin-right: 32px;
    margin-bottom: 16px;
  }

  #settings #settings-img-upload{
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  #settings #settings-img-upload+label{
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0 25px;
    background: $item-gray;
    cursor: pointer;
  }

  #settings #settings-img-upload+label:hover{
    background: $stor-blue;
    color: white;
  }

  #settings .info-settings-grid,
  #settings .address-settings-grid,
  #settings .password-settings-grid{
    max-width: 530px;
  }

  #settings .info-settings-grid .prompt{
    margin-bottom: 10px;
  }

  #settings .settings-input{
    @include mdc-text-field-outline-corner-radius_(0px);
  }

  #settings .mdc-text-field--outlined{
    min-width: 150px;
    height: 35px;
    margin: 0;
  }

  #settings .settings-input .mdc-floating-label{
    font-size: $text-font-size;
    line-height: normal;
    left: 12px;
    bottom: 12px;
  }

  #settings .settings-input .mdc-text-field__input{
    font-size: $text-font-size;
    padding: 4px 12px;
  }

  #settings .settings-input .mdc-floating-label--float-above{
    @include mdc-floating-label-ink-color($stor-blue);
    transform: translateY(-90%) translateX(4%) scale(0.75);
  }

  #settings .settings-input-outline{
    @include mdc-notched-outline-color($stor-blue);
  }

  #settings .mdc-text-field--focused{
    @include mdc-text-field-textarea-stroke-color($stor-blue);
  }

  #settings .mdc-text-field--textarea{
    @include mdc-text-field-textarea-corner-radius(0);

    border-color: #bfbfbf;
    width: 100%;
    overflow: visible;
  }

  #settings .mdc-text-field--textarea textarea{
    height: 150px;
    font-size: $text-font-size;
    padding: 4px 12px;
  }

  #settings .mdc-text-field--textarea .mdc-floating-label{
    font-size: $text-font-size;
    line-height: normal;
    z-index: -1;
    padding: 0;
    margin: 0;
    top: 10px;
    left: 12px;
  }

  #settings .mdc-text-field--textarea .mdc-floating-label--float-above{
    @include mdc-floating-label-ink-color($font-gray);

    transform: translateY(-190%) scale(0.9);
  }

  #settings .settings-submit{
    display: flex;
    align-items: center;
    height: 56px;
  }

  #settings .settings-submit button{
    width: 120px;
    height: 30px;
    outline: none;
    border: none;
    margin-left: auto;
    margin-right: 12px;
    background: $item-gray;
    cursor: pointer;
  }

  #settings .settings-submit button:hover{
    background: $stor-blue;
    color: white;
  }

  #settings .address-settings-grid .mdc-text-field--outlined{
    margin-bottom: 12px;
  }

  #settings .city-select select{
    font-size: $text-font-size;
    padding: 0 12px;
    height: 33px;
    -moz-appearance: none;
    -webkit-appearance: none;
  }

  #settings .city-select select::-ms-expand {
    display: none;
  }

  #settings .city-select .mdc-select--outlined{
    height: 35px;
    min-width: 150px;
  }

  #settings .city-select .mdc-floating-label{
    font-size: $text-font-size;
    line-height: normal;
    left: 12px;
    bottom: 12px;
  }

  #settings .city-select .mdc-floating-label--float-above{
    @include mdc-floating-label-ink-color($stor-blue);
    transform: translateY(-90%) translateX(4%) scale(0.75);
  }

  #settings .select-input-outline{
    @include mdc-select-outline-corner-radius(0);
    @include mdc-notched-outline-color($stor-blue);
  }
</style>
