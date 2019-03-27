<template>
  <div>
    <md-content class="get-verified md-elevation-1">
      <img src="https://placehold.it/60x60" alt="" srcset="">
      <div class="vtext">
        <span class="md-title">Get Verified</span>
        <span class="md-caption">
          We require that all users on Stor get verified before they can either list or rent a space. We do this to ensure safety and good practices on our platform
        </span>
      </div>
      <md-button class="md-raised md-accent verified">
        GET VERIFIED
      </md-button>
    </md-content>
    <md-content class="setting md-elevation-2">
      <md-tabs md-sync-route>
        

        <md-tab id="tab-public" md-label="Public" >
          <div>
            <img src="" alt="" srcset="">
            <div>
              <span class="nd-title">Change Profile Image</span>
              <span class="md-caption">Please crop your image to a square for best result</span>
            </div>
            <md-button class="md-dense md-primary">UPLOAD</md-button>
          </div>
          <md-divider></md-divider>
          <h3>Basic Information</h3>
          <p>Your name will only be shared with your renter</p>
          <form >
            <div class="md-layout md-gutter">
              <div class="form-tbox md-layout-item md-size-25">
                <label class="md-caption" for="">First Name</label>
                <input type="text" name="" id="" placeholder="First Name">
              </div>
              <div class="form-tbox md-layout-item md-size-25">
                <label class="md-caption" for="">Last Name</label>
                <input type="text" name="" id="" placeholder="Last Name">
              </div>
              <div class="form-tbox md-layout-item md-size-25">
                <label class="md-caption" for="">Username</label>
                <input type="text" name="" id="" placeholder="username">
              </div>
              <div class="form-tarea md-layout-item md-size-75">
                <label class="md-caption" for="">Bio(500 char max)</label>
                <textarea name="" id="" cols="30" rows="10" placeholder="Be nice. Say some cute shit"></textarea>
              </div>
            </div>
            <div class="md-layout-item">
              <md-divider></md-divider>
            </div>
            <md-card-actions>
              <md-button class="save-profile md-primary md-raised">SAVE</md-button>
            </md-card-actions>
          </form>
        </md-tab>

        <md-tab id="tab-private" md-label="Private">
          <h3>Address Information</h3>
          <p>Your name will only be shared with your renter</p>
          <form >
            <div class="md-layout md-gutter">
              <div class="form-tbox md-layout-item md-size-25">
                <label class="md-caption" for="">Address</label>
                <input type="text" name="" id="" placeholder="Address">
              </div>
              <div class="form-tbox md-layout-item md-size-25">
                <label class="md-caption" for="">Suite(optional)</label>
                <input type="text" name="" id="" placeholder="Suite(optional)">
              </div>
              <div class="form-tbox md-layout-item md-size-25">
                <label class="md-caption" for="">City</label>
                <input type="text" name="" id="" placeholder="City">
              </div>
              <div class="form-tbox md-layout-item md-size-25">
                <label class="md-caption" for="">Zip Code</label>
                <input type="text" name="" id="" placeholder="Zip Code">
              </div>
              <div class="form-tbox md-layout-item md-size-25">
                <label class="md-caption" for="">State</label>
                <input type="text" name="" id="" placeholder="State">
              </div>
              <div class="form-tbox md-layout-item md-size-25">
                <label class="md-caption" for="">Country</label>
                <input type="text" name="" id="" placeholder="Country">
              </div>
              <div class="md-layout-item md-size-100">
                <md-divider></md-divider>
              </div>
              <div class="md-layout-item md-size-100">
                <h3>Change Password</h3>
              </div>
              <div class="form-tbox md-layout-item md-size-25">
                <label class="md-caption" for="">Old Password</label>
                <input type="password" name="" id="" placeholder="Password">
              </div>
              <div class="form-tbox md-layout-item md-size-25">
                <label class="md-caption" for="">New Password</label>
                <input type="password" name="" id="" placeholder="New">
              </div>
              <div class="form-tbox md-layout-item md-size-25">
                <label class="md-caption" for="">Confirm Password</label>
                <input type="password" name="" id="" placeholder="Confirm">
              </div>
              <div class="form-tbox md-layout-item md-size-25">
                <md-button class="change-pwd md-raised">CHANGE</md-button>
              </div>
            </div>
            <div class="md-layout-item">
              <md-divider></md-divider>
            </div>
            <md-card-actions>
              <md-button class="save-profile md-primary md-raised">SAVE</md-button>
            </md-card-actions>
          </form>
        </md-tab>

        <md-tab id="tab-payments" md-label="Payments">
          Payments tab
          <p>Maiores, dolorum. Beatae, optio tempore fuga odit aperiam velit, consequuntur magni inventore sapiente alias sequi odio qui harum dolorem sunt quasi corporis.</p>
        </md-tab>
      </md-tabs>
    </md-content>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { MdButton, MdTabs, MdCard, MdContent, MdAvatar, MdList, MdIcon, MdSubheader, MdDivider } from 'vue-material/dist/components';
  import 'vue-material/dist/vue-material.min.css';

  Vue.use(MdButton);
  Vue.use(MdTabs);
  Vue.use(MdCard);
  Vue.use(MdContent);
  Vue.use(MdAvatar);
  Vue.use(MdList);
  Vue.use(MdIcon);
  Vue.use(MdSubheader);
  Vue.use(MdDivider);
  export default {

  }
</script>


<style lang="scss">
  @import "../../../../../node_modules/vue-material/dist/theme/engine";
  // @import "~vue-material/dist/theme/engine"; // Import the theme engine

  @include md-register-theme("default", (
    primary: #059de6, // The primary color of your application
    accent: #9bc765 // The accent or secondary color
  ));

  @import "../../../../../node_modules/vue-material/dist/theme/all"; // Apply the theme
  .md-content {
    // height: 100px;
    padding: 20px;

    &.get-verified {
      background: #a1dc556e;
      img {
        width: 60px;
        height: 60px;
        margin-right: 40px;
      }
    }

    &.setting {
      padding-top: 0;
      margin-bottom: 40px;;
    }


    &.get-verified {
      width: 100%;
      display: inline-flex;
      margin-bottom: 40px;
      .vtext > span {
        display: block;
      }
    }

    .md-button.verified {
      padding: 6px 20px;
      margin-top: 12px;
      width: 300px;
      color: white !important;
    }

    .md-tab {
      margin-right: 6px;

      .md-layout-item {
        margin-bottom: 20px;
      }

      form .form-tbox label, form .form-tarea label {
        display: block;
        color:rgba(0, 0, 0, 0.548)
      }

      form .form-tbox input {
        height: 32px;
        width: 100%;
        border: 1px solid rgba(150, 145, 145, 0.31);
        padding: 6px;
      }

      form .form-tarea textarea {
        width: 100%;
        border: 1px solid rgba(150, 145, 145, 0.31);
        padding: 6px;
      }
      
      .md-button.save-profile {
        color: white !important;
      }
      
      .md-button.change-pwd {
        background-color: rgb(29, 24, 24) !important;
        color: white !important;
        margin: 14px 8px;
      }
    }
  }
</style>
