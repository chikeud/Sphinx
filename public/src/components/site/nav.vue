<template>
  <div>
    <m-top-app-bar>
      <m-icon icon="menu" slot="navigation"></m-icon>
      <span>Stor</span>
      <m-icon icon="file_download" slot="actions"></m-icon>
    </m-top-app-bar>
  </div>
</template>

<script>
  import Vue from "vue"
  import TopAppBar from "material-components-vue/dist/top-app-bar"
  import Icon from "material-components-vue/dist/icon"

  Vue.use(TopAppBar);
  Vue.use(Icon);

  export default {}
</script>

<style lang="scss">
  @import "~material-components-vue/dist/top-app-bar/styles";
</style>
