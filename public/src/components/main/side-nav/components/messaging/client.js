/* eslint-disable no-undef */
/**
 * @author EmmanuelOlaojo
 * @since 6/7/18
 */

import config from "../../../../../config";

const CHAT_MSG = "chat-message";
const ALL_MSGS = "all-messages";
const ERR = "error";

export default class MessageClient{
  constructor(view){
    let token = localStorage.getItem(config.AUTH);

    if(!view.$store.getters.loggedIn){
      throw new Error("Not Logged In!!");
    }

    this.view = view;
    this.socket = io.connect(`/?${config.AUTH_TOKEN}=${token}`);

    this.socket.on(ERR, function(err){
      console.log("error", err);
    });

    this.listen();
  }

  send(data){
    let self = this;
    data[config.AUTH_TOKEN] = localStorage.getItem(config.AUTH);

    self.socket.emit(CHAT_MSG, data, function(msg){
      self.view.messages.push(msg);
    });
  }

  listen(){
    let self = this;

    self.socket.on(CHAT_MSG, function(msg){
      self.view.messages.push(msg);
      console.log(self.view.messages);
    });

    self.socket.on(ALL_MSGS, function(messages){
      console.log("All messages: ", messages);

      for(let msg of messages){
        self.view.messages.push(msg);
      }
    });
  }
}
