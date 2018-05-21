<template>
  <div id="app">
    <nav-bar></nav-bar>

    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  import Nav from "./components/site/nav.vue"

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
  body{

  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
