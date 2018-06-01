<template>
  <div id="app">
    <nav-bar></nav-bar>

    <router-view></router-view>
  </div>
</template>

<script>
  import Nav from "./components/nav/nav.vue"

  export default {
    name: 'app',
    data () {
      return {
        msg: 'Some fucking message'
      }
    },
    components: {
      "nav-bar": Nav
    },
  }
</script>

<style>
  body, h1{
    margin: 0;
    padding: 0;
  }

  #app *:not(.material-icons){
    font-family: 'Proxima Nova', 'Montserrat', Helvetica, sans-serif !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
</style>
