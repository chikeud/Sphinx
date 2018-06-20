<template>
  <div id="messages">
    <m-card class="msg-card">
      <div class="msg-select">
        <div class="msg-card-top">
          <m-icon :style="{color : searchUser ? storBlue : iconGrey}" icon="search"></m-icon>
          <input id="msg-search" class="in" type="text"
                 v-model="searchUser" placeholder="Search Inbox"/>
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
          <div class="convo-search-bar">
            <div class="convo-search-controls">
              <m-icon icon="keyboard_arrow_up"></m-icon>
              <m-icon icon="keyboard_arrow_down"></m-icon>
            </div>

            <input id="convo-search" class="in" type="text"
                   v-model="searchConvo" placeholder="Search Messages"/>
          </div>
        </div>

        <div class="msg-display">
          <div class="msg-unit" v-for="msg in msgList" :key="msg.id" :id="msg.id">
            <div :class="['msg-box', msg.from._id === user._id ? 'msg-self' : 'msg-partner']"
                 @click="showDates = !showDates">
               <span v-if="msg.foundText" v-html="msg.foundText">
                 {{msg.foundText}}
               </span>
               <span v-else>
                 {{msg.text}}
               </span>
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

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  export default {
    data(){
      return {
        user: {},
        messages: [],
        selected: "",
        to: "",
        searchUser: "",
        searchConvo: "",
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

        if (!self.user) return;

        let search = self.searchUser ? self.searchUser.toLowerCase() : "";
        let convos = {};
        let nameMatch = false;

        for(let msg of self.messages){
          let partner = msg.to._id === self.user._id ? msg.from : msg.to;

          if(search){
            nameMatch = partner.firstName.toLowerCase().includes(search)
              || partner.lastName.toLowerCase().includes(search);

            if(!nameMatch) continue;
          }

          if(!convos[partner._id]){
            convos[partner._id] = {
              info: partner,
              messages: [msg],
            };
          }
          else{
            convos[partner._id].messages.push(msg);
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
        let self = this;
        let search = self.searchConvo ? new RegExp(escapeRegExp(self.searchConvo), "gi") : "";
        let openMark = "<mark>";
        let closeMark = "</mark>";
        let startIndex;
        let endIndex;
        let result = [];


        if(self.selected){
          for(let msg of self.conversations[self.selected].messages){
            if(search){
              msg.foundText = msg.text;

              while(search.test(msg.foundText)){
                startIndex = search.lastIndex - search.source.length;
                endIndex = search.lastIndex + openMark.length;

                if(search.lastIndex === msg.foundText.length){
                  startIndex++;
                }

                msg.foundText = msg.foundText.insert(startIndex, openMark);
                msg.foundText = msg.foundText.insert(endIndex, closeMark);
                search.lastIndex = endIndex + closeMark.length;
              }
            }

            if(!search || msg.foundText === msg.text){
              msg.foundText = "";
            }

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

  .msg-card .material-icons{
    font-size: 25px;
    color: #CFD8DC;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 10px 0 15px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .msg-card-top{
    width: 100%;
    height: 58px;
    min-height: 58px;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #EDEFF0;
  }

  .msg-card-top input{
    width: 90%;
    height: 48px;
    margin: 0;
    padding-top: 5px;
    border: none;
  }

  .msg-card-top input::placeholder{
    color: #CFD8DC;
  }

  .msg-card-top .convo-search-bar{
    width: 90%;
    display: flex;
  }

  .msg-card-top .convo-search-controls{
    display: flex;
    margin-right: 10px;
  }

  .convo-search-controls .material-icons{
    font-size: 30px;
    margin: 0;
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
