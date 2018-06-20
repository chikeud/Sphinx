<template>
  <div id="messages">
    <m-card class="msg-card">
      <div class="msg-select">
        <div class="msg-card-top">
          <m-icon :style="{color : search ? storBlue : iconGrey}" icon="search"></m-icon>
          <input id="msg-search" class="in" type="text"
                 v-model="search" placeholder="Search Messages"/>
        </div>

        <div class="msg-select-list">
          <m-list two-line>
            <m-list-item v-for="partner in partners"
                         :key="partner.info._id"
                         :class="{'msg-selected': selected === partner.info._id}"
                         @click="selected = partner.info._id">

              <img onerror="this.style.opacity='0'" :src="profileImg(partner.info._id)" slot="graphic"/>

              <div class="msg-select-header" slot="text">
                {{partner.displayName}}
              </div>
              <div class="msg-select-sub" slot="secondaryText">{{partner.lastMsg}}</div>
            </m-list-item>
          </m-list>
        </div>

      </div>

      <div class="msg-reader">
        <div class="msg-card-top">

        </div>

        <div class="msg-display">
          <div class="msg-unit" v-for="msg in msgList" :key="msg.id">
            <div :class="['msg-box', msg.from._id === user._id ? 'msg-self' : 'msg-partner']"
                 @click="showDates = !showDates">
               {{msg.text}}
            </div>
            <div v-show="showDates"
                 :class="['msg-time',msg.from._id === user._id ? 'msg-time-self' : 'msg-time-partner']">
              {{msg.at}}
            </div>
          </div>
        </div>

        <div class="msg-new">
          <input v-model="to" placeholder="to?"/>
          <textarea id="msg-text" rows="1" class="in"
                    v-model="message" placeholder="Enter Message"></textarea>

          <div @click="send">
            <m-icon :style="{color : message ? storBlue : iconGrey}" icon="send"></m-icon>
          </div>
        </div>
      </div>
    </m-card>
  </div>
</template>

<script>
  import Vue from "vue";
  import moment from "moment";
  import autoSize from "autosize";
  import Card from "material-components-vue/dist/card";
  import List from "material-components-vue/dist/list";
  import TextField from "material-components-vue/dist/textfield";
  import NotchedOutline from "material-components-vue/dist/notched-outline";
  import FloatingLabel from "material-components-vue/dist/floating-label";
  import Elevation from "material-components-vue/dist/elevation";
  import Icon from "material-components-vue/dist/icon";

  import MessageClient from "./client";

  Vue.use(Card);
  Vue.use(List);
  Vue.use(TextField);
  Vue.use(NotchedOutline);
  Vue.use(FloatingLabel);
  Vue.use(Elevation);
  Vue.use(Icon);

  let messageClient;

  function resize($window){
    let classes = [".msg-card", ".msg-select", ".msg-reader"];
    let newHeight = 0.76 * $window.height();

    for(let elem of classes){
      $(elem).css({
        height: `${newHeight}px`
      });
    }

    $(".msg-select-list").css({
      height: `${$(".msg-card").height() - $(".msg-card-top").height()}px`
    });
  }

  function preview(messages){
    let lastMsg = messages[messages.length - 1].text;
    let preview = lastMsg.substr(0, 20);

    return preview.length < lastMsg.length ? `${preview} . . .` : preview;
  }

  export default {
    data(){
      return {
        user: {},
        messages: [],
        selected: "",
        to: "",
        search: "",
        message: "",
        storBlue: "#03A9F4",
        iconGrey: "#CFD8DC",
        showDates: false
      }
    },

    methods:{
      profileImg(id){
        return `/api/images/?userId=${id}`;
      },

      send(){
        let self = this;

        if(!(self.message && self.to)) return;

        let data = {text: self.message, to: self.to};

        messageClient.send(data);
        self.message = "";
      }
    },

    computed: {
      conversations(){
        let self = this;
        let convos = {};

        if(self.user){
          for(let msg of self.messages){
            let partner = msg.to._id === self.user._id ? msg.from : msg.to;

            if(!convos[partner._id]){
              convos[partner._id] = {
                info: partner,
                messages: [msg]
              };
            }
            else{
              convos[partner._id].messages.push(msg);
            }
          }
        }

        return convos;
      },

      partners(){
        let self = this;
        let partners = Object.keys(self.conversations);
        let result = [];
        let info;

        for(let partner of partners){
          info = self.conversations[partner].info;

          console.log(info);

          result.push({
            info,
            displayName: `${info.firstName} ${info.lastName[0]}`,
            lastMsg: preview(self.conversations[partner].messages)
          });
        }

        self.selected = partners[0];

        return result;
      },

      msgList(){
        let result = [];
        let self = this;

        if(self.selected){
          for(let msg of self.conversations[self.selected].messages){
            msg.at = moment(msg.createdAt).format("MMMM Do YYYY, h:mm a");
            result.push(msg);
          }
        }

        return result;
      }
    },

    mounted(){
      let self = this;
      let $window = $(window);
      let $msgInput = $(".msg-new textarea");

      messageClient = new MessageClient(self);

      resize($window);

      $window.on("resize", () => {
        resize($window);
      });

      $msgInput.on("click.autoSize", () => {
        autoSize($(".msg-new textarea"));

        $msgInput.off("click.autoSize");
      });

    }
  }
</script>

<style lang="scss">
  @import "../../../../../../node_modules/material-components-vue/dist/card/styles";
  @import "../../../../../../node_modules/material-components-vue/dist/list/styles";
  @import "../../../../../../node_modules/material-components-vue/dist/textfield/styles";
  @import "../../../../../../node_modules/material-components-vue/dist/notched-outline/styles";
  @import "../../../../../../node_modules/material-components-vue/dist/floating-label/styles";
  @import "../../../../../../node_modules/material-components-vue/dist/elevation/styles";

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

  .msg-card .msg-select-list{
    height: 88%;
    overflow-y: auto;
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
    min-height: 58px;
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

  .msg-select .mdc-list{
    padding: 0;
  }

  .msg-select .msg-selected{
    background-color: #EDEFF0;
  }

  .msg-select .msg-select-header{
    font-size: 14px;
    color: #546F7A;
    line-height: 1;
  }

  .msg-select .msg-select-sub{
    font-size: 13px;
    color: #90A4AE;
    line-height: 1.4;
  }

  .msg-select .mdc-list-item{
    height: 84px;
    cursor: pointer;
  }

  .msg-select .mdc-list-item__graphic{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .msg-card, .msg-select, .msg-reader{
    min-height: 420px;
  }

  .msg-reader{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .msg-reader .msg-card-top{
    border-bottom: none;
  }

  .msg-reader .msg-display{
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    margin-bottom: 15px;
  }

  .msg-reader .msg-unit{
    display: flex;
    align-items: center;
    align-self: center;
    flex-direction: column;
    width: 90%;
    min-height: fit-content;
    font-size: 13px;
    margin-top: 15px;
  }

  .msg-reader .msg-unit:first-child{
    margin-top: 0;
  }

  .msg-unit .msg-box{
    max-width: 300px;
    padding: 15px;
    line-height: 1.5;
    cursor: pointer;
  }

  .msg-unit .msg-time{
    font-size: 10px;
    margin-top: 5px;
  }

  .msg-unit .msg-time-self{
    margin-left: auto;
  }

  .msg-unit .msg-time-partner{
    margin-right: auto;
  }

  .msg-reader .msg-self{
    margin-left: auto;
    background-color: #03A9F4;
    color: white;
  }

  .msg-reader .msg-partner{
    margin-right: auto;
    background-color: #EDEFF0;
    color: #37474F
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
    max-height: 120px;
    padding: 10px;
    border: none;
    resize: none;
  }

  .msg-new textarea::placeholder{
    color: #CFD8DC;
  }

  .msg-new .material-icons{
    font-size: 20px;
  }
</style>
