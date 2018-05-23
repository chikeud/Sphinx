<template>
  <m-card>
    <m-typo-headline :level="2">
      Title
    </m-typo-headline>

    <m-typo-body :level="1">

    </m-typo-body>
  </m-card>
</template>

<script>
  import Vue from "vue";
  import Card from "material-components-vue/dist/card"
  import Button from "material-components-vue/dist/button"
  import Elevation from "material-components-vue/dist/elevation"
  import Typography from "material-components-vue/dist/typography"

  Vue.use(Card);
  Vue.use(Button);
  Vue.use(Elevation);
  Vue.use(Typography);

  export default {
    data(){
      return {
        content: "Some fucking content"
      }
    }
  }
</script>

<style lang="scss">
  @import "~material-components-vue/dist/card/styles";
  @import "~material-components-vue/dist/button/styles";
  @import "~material-components-vue/dist/elevation/styles";
  @import "~material-components-vue/dist/Typography/styles";

</style>
