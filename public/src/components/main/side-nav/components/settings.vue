<template>
  <div id="settings">
    <m-card class="public-settings">
      <div class="settings-title">Public</div>
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

  Vue.use(Card);
  Vue.use(Elevation);
  Vue.use(LayoutGrid);
  Vue.use(Icon);

  export default {
    data(){
      return {

      };
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../../node_modules/material-components-vue/dist/card/styles";
  @import "../../../../../node_modules/material-components-vue/dist/elevation/styles";
  @import "../../../../../node_modules/material-components-vue/dist/layout-grid/styles";

  #settings .mdc-card{
    margin-bottom: 15px;
  }

  #settings .settings-title{
    display: flex;
    align-items: center;
    padding: 15px;
    font-size: 14px;
  }
</style>
