<template>
  <div id="settings">
    <m-card class="public-settings">
      <div class="settings-title">Public</div>

      <div class="settings-content">
        <hr>

        <m-layout-grid>
          <m-layout-grid-inner>

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

        <m-layout-grid>
          <m-layout-grid-inner>
            <m-layout-grid-cell :span="12">
              <div class="prompt">
                <div class="heading">Basic Information</div>
                <span>Will only be shared with potential hosts and renters</span>
              </div>
            </m-layout-grid-cell>
          </m-layout-grid-inner>
        </m-layout-grid>

      </div>
    </m-card>
    <m-card class="private-settings">
      <div class="settings-title">Private</div>
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
  import Icon from "material-components-vue/dist/icon";

  import {readFiles} from "../../../../public.utils.js"

  Vue.use(Card);
  Vue.use(Elevation);
  Vue.use(LayoutGrid);
  Vue.use(Icon);

  export default {
    data(){
      return {
        profileImg: null
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

<style lang="scss" scoped>
  @import "../../../../../node_modules/material-components-vue/dist/card/styles";
  @import "../../../../../node_modules/material-components-vue/dist/elevation/styles";
  @import "../../../../../node_modules/material-components-vue/dist/layout-grid/styles";

  #settings{
    font-size: 12px;
    color: #546F7A;
  }

  #settings .mdc-card{
    margin-bottom: 15px;
  }

  #settings .settings-title{
    display: flex;
    align-items: center;
    padding: 15px;
    font-size: 14px;
    color: black;
  }

  #settings hr{
    border: none;
    margin: 0;
    height: 2px;
    background: #EDEFF0;
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
    background: #EDEFF0;
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
    background: #EDEFF0;
    cursor: pointer;
  }

  #settings #settings-img-upload+label:hover{
    background: #03A9F4;
    color: white;
  }
</style>
