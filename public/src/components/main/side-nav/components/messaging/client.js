/* eslint-disable no-undef */
/**
 * @author EmmanuelOlaojo
 * @since 6/7/18
 */

import moment from "moment"

import config from "../../../../../config";

const CHAT_MSG = "chat-message";
const ALL_MSGS = "all-messages";
const ERR = "error";

export default class MessageClient{

  /**
   * Connects to MessageServer, initializes
   * necessary variables, and listens for incoming
   * messages.
   *
   * @param view - the message component's data object
   */
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

  /**
   * Sends provided data to the server
   *
   * @param data - to be sent
   */
  send(data){
    let self = this;
    data[config.AUTH_TOKEN] = localStorage.getItem(config.AUTH);

    self.socket.emit(CHAT_MSG, data, function(msg){
      self.addMsg(msg);
    });
  }

  /**
   * Listens for incoming messages
   */
  listen(){
    let self = this;

    self.socket.on(CHAT_MSG, function(msg){
      self.addMsg(msg);
    });

    self.socket.on(ALL_MSGS, function(data){
      if(!self.view.messages.length){
        self.view.user = data.user;

        for(let msg of data.messages){
          self.addMsg(msg);
        }
      }
    });
  }

  /**
   * Adds a message to the view.
   *
   * @param msg - to add
   */
  addMsg(msg){
    msg.at = moment(msg.createdAt).format("MMMM Do YYYY, h:mm a");
    this.view.messages.push(msg);
  }
}
