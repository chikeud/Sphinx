<template>
  <div id="messages">
    <m-card class="msg-card">
      <div class="msg-select">
        <div class="msg-card-top">
          <m-icon icon="search"></m-icon>
          <input id="msg-search" class="in" type="text" placeholder="Search Messages"/>
        </div>

      </div>

      <div class="msg-reader">
        <div class="msg-card-top">

        </div>

        <div class="msg-display">{{message}}</div>

        <div class="msg-new">
          <textarea id="msg-text" rows="1" class="in" v-model="message" placeholder="Enter Message"></textarea>

          <m-icon icon="send"></m-icon>
        </div>
      </div>
    </m-card>
  </div>
</template>

<script>
  import Vue from "vue";
  import Card from "material-components-vue/dist/card";
  import TextField from "material-components-vue/dist/textfield";
  import NotchedOutline from "material-components-vue/dist/notched-outline";
  import FloatingLabel from "material-components-vue/dist/floating-label";
  import Elevation from "material-components-vue/dist/elevation";
  import Icon from "material-components-vue/dist/icon";

  import autoSize from "autosize";

  Vue.use(Card);
  Vue.use(TextField);
  Vue.use(NotchedOutline);
  Vue.use(FloatingLabel);
  Vue.use(Elevation);
  Vue.use(Icon);

  let resize = function($window){
    let classes = [".msg-card", ".msg-select", ".msg-reader"];
    let newHeight = 0.76 * $window.height();

    for(let elem of classes){
      $(elem).css({
        height: `${newHeight}px`
      });
    }
  };

  export default {
    data(){
      return {
        message: "",
      }
    },

    mounted(){
      let $window = $(window);
      let $msgInput = $(".msg-new textarea");
      let $input = $(".in");
      let icons = {
        "msg-search" : $("#msg-search").parent().find(".material-icons"),
        "msg-text": $("#msg-text").parent().find(".material-icons")
      };

      resize($window);

      $window.on("resize", () => {
        resize($window);
      });

      $msgInput.on("click.autoSize", () => {
        autoSize($(".msg-new textarea"));

        $msgInput.off("click.autoSize");
      });


      (() => {
        let $icon;

        $input.click(function () {
          $icon = icons[this.id];

          $icon.css({
            color: "#03A9F4"
          });
        });

        $input.blur(function () {
          $icon = icons[this.id];

          $icon.css({
            color: "#CFD8DC"
          });
        });
      })()
    }
  }
</script>

<style lang="scss">
  @import "../../../../../node_modules/material-components-vue/dist/card/styles";
  @import "../../../../../node_modules/material-components-vue/dist/textfield/styles";
  @import "../../../../../node_modules/material-components-vue/dist/notched-outline/styles";
  @import "../../../../../node_modules/material-components-vue/dist/floating-label/styles";
  @import "../../../../../node_modules/material-components-vue/dist/elevation/styles";

  #messages{
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .msg-card{
    display: flex;
    width: 90%;
  }

  .msg-card > div{
    display: flex;
  }

  .msg-card .msg-select{
    border-right: 1px solid #EDEFF0;
    flex: 1 1 482px;
  }

  .msg-card .msg-reader{
    flex: 1.5 1.5 1450px;
  }

  .msg-card .in:focus{
    outline: none;
  }

  .msg-card .in{
    font-size: 16px;
    color: #546F7A;
  }

  .msg-card-top{
    width: 100%;
    height: 58px;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #EDEFF0;
  }

  .msg-card .material-icons{
    font-size: 30px;
    color: #CFD8DC;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 10px 0 15px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .msg-select input{
    width: 90%;
    height: 48px;
    margin: 0;
    padding-top: 5px;
    border: none;
  }

  .msg-select input::placeholder{
    color: #CFD8DC;
  }

  .msg-card, .msg-select, .msg-reader{
    min-height: 420px;
  }

  .msg-reader{
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
  }

  .msg-reader .msg-new{
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto 0 35px;
    border: 1px solid #EDEFF0;
  }

  .msg-new textarea{
    width: 90%;
    max-height: 200px;
    padding: 10px;
    border: none;
    resize: none;
  }

  .msg-new textarea::placeholder{
    color: #CFD8DC;
  }

  .msg-new .material-icons{
    font-size: 25px;
  }
</style>
