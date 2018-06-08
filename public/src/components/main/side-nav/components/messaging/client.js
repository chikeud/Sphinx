/* eslint-disable no-undef */
/**
 * @author EmmanuelOlaojo
 * @since 6/7/18
 */

import config from "../../../../../config";

export default class MessageClient{
  constructor(view){
    let token = localStorage.getItem(config.AUTH);

    if(!view.$store.getters.loggedIn){
      throw new Error("Not Logged In!!");
    }

    this.view = view;
    this.socket = io.connect(`/?${config.AUTH_TOKEN}=${token}`);

    this.listen();
  }

  send(data){
    this.socket.emit("chat-message", data);
  }

  listen(){
    let self = this;

    self.socket.on("chat-message", function(msg){
      self.view.messages.push(msg);
    });
  }
}
