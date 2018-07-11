<template>
  <div id="messages">
    <m-card class="msg-card">
      <div class="msg-select">
        <div class="msg-card-top">
          <button>
            <m-icon :style="{color : searchUser ? storBlue : iconGrey}" icon="search"></m-icon>
          </button>
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
          <div class="convo-search-bar" v-show="showSearchBar">
            <div class="convo-search-controls">
              <button @click="foundPrev">
                <m-icon :style="{color : hasFoundPrev ? storBlue : iconGrey}" icon="keyboard_arrow_up"></m-icon>
              </button>

              <button @click="foundNext">
                <m-icon :style="{color : hasFoundNext ? storBlue : iconGrey}" icon="keyboard_arrow_down"></m-icon>
              </button>

              <div>{{foundIndex}} of {{found.length}}</div>
            </div>

            <input id="convo-search" class="in" type="text"
                   v-model="searchConvo" placeholder="Search Messages"/>
          </div>

          <m-menu-anchor class="msg-reader-menu">
            <button @click="openMenu = !openMenu">
              <m-icon icon="more_vert"></m-icon>
            </button>
            <m-menu v-model="openMenu">
              <m-list>
                <m-list-item v-if="showSearchBar" @click="toggleSearchBar">End Search</m-list-item>
                <m-list-item v-else @click="toggleSearchBar">Search Messages</m-list-item>
              </m-list>
            </m-menu>
          </m-menu-anchor>
        </div>

        <div class="msg-display" v-if="msgList">
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

        <div v-else>
          Whoops! No messages to show here.
        </div>

        <div class="msg-new">
          <div class="msg-new-top" v-if="files.length">
            <div v-for="(img, index) in files" :id="`img-${index}`" class="msg-img-preview">
              <button @click="removeFile(index)"><m-icon icon="close"></m-icon></button>
              <img :src="img.url" :alt="`img-${index}`"/>
            </div>
          </div>

          <div class="msg-new-bottom">
            <input v-model="to" placeholder="to"/>

            <input id="msg-text" class="in" v-model="message" placeholder="Enter Message">

            <input @change="addFile" type="file" multiple id="msg-upload"/>
            <label for="msg-upload" id="msg-upload-label">
              <m-icon icon="attachment"></m-icon>
            </label>

            <button @click="send">
              <m-icon :style="{color : hasMessage ? storBlue : iconGrey}" icon="send"></m-icon>
            </button>
          </div>
        </div>
      </div>
    </m-card>
  </div>
</template>

<script>
  import Vue from "vue";
  import Card from "material-components-vue/dist/card";
  import Menu from "material-components-vue/dist/menu";
  import List from "material-components-vue/dist/list";
  import NotchedOutline from "material-components-vue/dist/notched-outline";
  import Elevation from "material-components-vue/dist/elevation";
  import Icon from "material-components-vue/dist/icon";

  import MessageClient from "./client";

  Vue.use(Card);
  Vue.use(Menu);
  Vue.use(List);
  Vue.use(NotchedOutline);
  Vue.use(Elevation);
  Vue.use(Icon);

  let messageClient;
  const SCROLL_TIME = 100;

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

  /**
   * Reads an uploaded file
   *
   * @param input
   */
  function readFiles(input) {
    const LENGTH = input.files.length;

    if(!LENGTH) return;

    let reader = new FileReader();
    let result = [];
    let count = 0;

    return new Promise(function(resolve, reject){
      let readNextFile = () => {
        while(count < LENGTH && !(/\.(jpe?g|png|gif)$/i.test(input.files[count].name))){
          count++;
        }

        if(count < LENGTH) {
          reader.readAsDataURL(input.files[count]);
        }
        else{
          input.value = "";
          resolve(result);
        }
      };

      reader.addEventListener("load", () => {
        result.push({
          file: input.files[count],
          url: reader.result
        });
      });

      reader.addEventListener("loadend", () => {
        count++;
        readNextFile();
      });

      reader.addEventListener("error", () => {
        reject(reader.error);
      });

      readNextFile();
    });
  }

  export default {
    data(){
      return {
        openMenu: false,
        showSearchBar: false,
        user: {},
        messages: [],
        found: [],
        currFound: "",
        foundTop: 0,
        selected: "",
        to: "",
        searchUser: "",
        searchConvo: "",
        message: "",
        files: [],
        storBlue: "#03A9F4",
        iconGrey: "#CFD8DC",
        showDates: false
      }
    },

    methods:{
      profileImg(id){
        return `/api/images/?userId=${id}`;
      },

      toggleSearchBar(){
        let self = this;

        if(self.showSearchBar){
          self.searchConvo = "";
        }

        self.showSearchBar = !self.showSearchBar;
      },

      markFound(){
        let self = this;

        if(!self.currFound) return;

        const MARKED = "marked";
        let $elem = $(`#${self.currFound}`);
        let $prevELem = $(`.${MARKED}`);
        let $msgDisplay = $(".msg-display");
        let offsetTop = $elem.position().top;

        $prevELem.removeClass(MARKED);
        $elem.addClass(MARKED);

        if(offsetTop > $msgDisplay.height() || offsetTop < 0){
          console.log("offset", offsetTop);
          $msgDisplay.animate({scrollTop: offsetTop + $msgDisplay.scrollTop()}, SCROLL_TIME);
        }
      },

      foundNext(){
        let self = this;

        if(!self.hasFoundNext) return;

        // self.foundIndex: 1 based index
        self.currFound = self.found[self.foundIndex];
      },

      foundPrev(){
        let self = this;

        if(!self.hasFoundPrev) return;

        // self.foundIndex: 1 based index
        self.currFound = self.found[self.foundIndex - 2];
      },

      async addFile(event){
        let self = this;

        try{
          let files = await readFiles(event.target);

          for(let file of files){
            self.files.push(file);
          }
        }
        catch(err){
          console.log("File Upload Error:", err);
        }
      },

      removeFile(index){
        this.files.splice(index, 1);
      },

      send(){
        let self = this;

        if(!((self.message || self.files) && self.to)) return;

        let files = self.files.map(f => f.file);

        let data = {text: self.message, to: self.to, files};

        messageClient.send(data);

        self.message = "";
        self.files = [];
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

        if(!self.selected) return;

        let $msgDisplay = $(".msg-display");
        let search = self.searchConvo ? new RegExp(escapeRegExp(self.searchConvo), "gi") : "";
        let result = [];
        let foundIndex = 1;
        const closeMark = "</mark>";
        let foundId;
        let openMark;
        let startIndex;
        let endIndex;

        self.found = [];

        for(let msg of self.conversations[self.selected].messages){
          if(search){
            msg.foundText = msg.text;

            while(search.test(msg.foundText)){
              foundId = `found-msg-${foundIndex}`;
              openMark = `<mark id=${foundId}>`;
              startIndex = search.lastIndex - search.source.length;
              endIndex = search.lastIndex + openMark.length;

              msg.foundText = msg.foundText.insert(startIndex, openMark);
              msg.foundText = msg.foundText.insert(endIndex, closeMark);
              search.lastIndex = endIndex + closeMark.length;
              self.found.push(foundId);
              foundIndex++;
            }
          }

          if(!search || msg.foundText === msg.text){
            msg.foundText = false;
            self.currFound = "";
          }

          result.push(msg);
        }

        if(self.found.length){
          self.currFound = self.found[self.found.length - 1];
        }
        else{
          self.$nextTick(() => {
            $msgDisplay.animate({scrollTop: $msgDisplay.prop("scrollHeight")}, SCROLL_TIME);
          });
        }

        return result;
      },

      foundIndex(){
        let self = this;

        if(!self.currFound) return 0;

        let split = self.currFound.split("-");

        return parseInt(split[split.length - 1]);
      },

      hasFoundNext(){
        let self = this;

        return self.foundIndex && self.foundIndex < self.found.length;
      },

      hasFoundPrev(){
        let self = this;

        return self.foundIndex > 1;
      },

      hasMessage(){
        return this.message || this.files.length;
      }
    },

    updated(){
      let self = this;

      self.$nextTick(self.markFound);
    },

    mounted(){
      let self = this;
      let $window = $(window);
      let $msgText = $("#msg-text");
      const ENTER_KEY = 13;

      messageClient = new MessageClient(self);

      resize($window);

      $window.on("resize", () => {
        resize($window);
      });

      $msgText.keypress(e => {
        if(e.which === ENTER_KEY){
          console.log("yo!");
          self.send();
        }
      });
    }
  }
</script>

<style lang="scss">
  @import "../../../../../../node_modules/material-components-vue/dist/card/styles";
  @import "../../../../../../node_modules/material-components-vue/dist/menu/styles";
  @import "../../../../../../node_modules/material-components-vue/dist/list/styles";
  @import "../../../../../../node_modules/material-components-vue/dist/notched-outline/styles";
  @import "../../../../../../node_modules/material-components-vue/dist/elevation/styles";

  #messages{
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .msg-card{
    display: flex;
    flex: 1;
  }

  .msg-card > div{
    display: flex;
  }

  .msg-card button {
    display: flex;
    padding: 0;
    margin: 0;
    justify-content: center;
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
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
    min-height: 420px;
    display: flex;
    flex: 1.5 1.5 1450px;
    flex-direction: column;
    align-items: center;
  }

  .msg-reader .msg-reader-menu{
    display: flex;
    margin-left: auto;
  }

  .msg-reader-menu .material-icons{
    color: #03A9F4 !important;
    margin: 0 !important;
    position: relative;
    left: 10px;
  }

  .msg-reader-menu .mdc-menu {
    margin-top: 6px;
  }

  .msg-reader-menu .mdc-list {
    padding: 5px 0;
  }

  .msg-reader-menu .mdc-list-item{
    font-size: 13px;
    color: #546F7A;
    height: 30px;
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
    margin: 0 auto;
    height: 58px;
    min-height: 58px;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #EDEFF0;
  }

  .msg-card-top input{
    flex: 1;
    height: 48px;
    margin: 0;
    padding-top: 5px;
    border: none;
  }

  .msg-card-top input::placeholder{
    color: #CFD8DC;
  }

  .msg-card-top .convo-search-bar{
    display: flex;
    justify-content: space-between;
    flex: 1;
  }

  .msg-card-top .convo-search-controls{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    margin-right: 15px;
    color: #CFD8DC;
  }

  .convo-search-controls .material-icons{
    font-size: 30px;
    margin: 0;
    position: relative;
    right: 8px;
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

  .msg-reader .msg-card-top{
    border-bottom: none;
    width: 90%;
  }

  .msg-reader .msg-display{
    position: relative;
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

  .msg-reader mark{
    border: 2px dashed yellow
  }

  .msg-reader .marked{
    border-color: black;
  }

  .msg-reader .msg-new{
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    width: 90%;
    margin: auto 0 35px;
    padding: 8px 0 8px 8px;
    border: 1px solid #EDEFF0;
  }

  .msg-new .msg-new-top{
    display: flex;
    width: 100%;
    overflow-y: auto;
    margin-bottom: 10px;
  }

  .msg-new-top .msg-img-preview{
    position: relative;
    margin-right: 8px;
  }

  .msg-img-preview button{
    position: absolute;
    top: 2px;
    left: 2px;
  }

  .msg-img-preview .material-icons{
    background: black;
    margin: 0;
    border-radius: 50%;
    opacity: 0.3;
    border: 2px solid white;
    font-size: 20px;
  }

  .msg-img-preview:hover .material-icons{
    opacity: 0.8;
  }

  .msg-img-preview img{
    height: 108px;
  }

  .msg-new .msg-new-bottom{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .msg-new-bottom #msg-text{
    width: 90%;
    padding-left: 10px;
    border: none;
    font-size: 14px;
    color: #37474F;
  }

  .msg-new-bottom #msg-text::placeholder{
    color: #CFD8DC;
  }

  .msg-new-bottom .material-icons{
    font-size: 20px;
  }

  .msg-new-bottom #msg-upload{
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  #msg-upload-label .material-icons{
    margin: 0;
    font-size: 24px;
    color: #03A9F4;
  }
</style>
