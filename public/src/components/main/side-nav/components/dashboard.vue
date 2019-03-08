<template>
  <div class="container">
    {{msg}}
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
