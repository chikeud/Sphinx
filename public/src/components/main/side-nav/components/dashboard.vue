<template>
  <div class="container">
    <div class="left">
      <m-card primaryAction>
        <m-typo-headline class="demo">
          Title
        </m-typo-headline>
        <m-typo-body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </m-typo-body>
        <m-button

          href="https://github.com/matsp/material-components-vue/blob/master/components/Card">
          github
        </m-button>
      </m-card>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
  import 'vue-material/dist/vue-material.min.css'
  import Card from "material-components-vue/dist/card";
  import Button from "material-components-vue/dist/button";
  import TextField from "material-components-vue/dist/textfield";
  import NotchedOutline from "material-components-vue/dist/notched-outline";
  import FloatingLabel from "material-components-vue/dist/floating-label";
  import Elevation from "material-components-vue/dist/elevation";
  import Icon from "material-components-vue/dist/icon";

  Vue.use(MdButton);
  Vue.use(MdContent);
  Vue.use(MdTabs);

  Vue.use(Card);
  Vue.use(Button);
  Vue.use(TextField);
  Vue.use(NotchedOutline);
  Vue.use(FloatingLabel);
  Vue.use(Elevation);
  Vue.use(Icon);

  export default {
    data(){
      return {
        msg: "Dashboard"
      }
    }
  }
</script>

<style lang="scss">
  .left{
    text-align: center;
  }
  .container{
    display: flex;
    flex-direction: row;
  }

</style>
