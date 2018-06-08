/**
 * @author EmmanuelOlaojo
 * @since 6/7/18
 */

let socketIo = require("socket.io");

let config = require("../../../config");
let auth = require("../../../utils/authToken");
let Message = require("../../models/messaging").Message;
let User = require("../../models/user").User;

class MessageServer{

  constructor(server){
    let self = this;
    self.server = server;
    self.connected = {};
    self.io = socketIo(server);
  }

  start(){
    let self = this;

    self.io.on("connection", async function(socket){
      let token = socket.handshake.query[config.AUTH_TOKEN];

      try{
        let user = await auth.validateToken(token);

        if(!user){
          return self._fail(socket);
        }

        self.connected[user._id] = {
          socketId: socket.id,
          user: user
        };

        self._listen(socket);

        let messages = await getAllMessages(user);

        self.io.to(socket.socketId).emit("all-messages", messages);
      }
      catch (err){
        self._fail(err, socket);
      }
    });
  }

  _listen(socket){
    let self = this;

    socket.on("chat-message", async function(msg, respond){
      let token = msg[config.AUTH_TOKEN];

      try{
        let user = await auth.validateToken(token);

        if(!user){
          return self._fail(socket);
        }

        let message = new Message();
        let recipient = await verifyUser(msg.to);

        if(!recipient) {
          console.log("None");

          return self.fail(socket, {msg: "invalid recipient"});
        }

        message.from = user._id;
        message.to = recipient._id; // make sure msg.to is valid user id
        message.text = msg.text;

        message = await message.save();
        recipient = self.connected[message.to];

        if(recipient){
          self.io.to(recipient.socketId).emit("chat-message", message);
        }

        console.log(self.connected);

        respond(message);
      }
      catch (err){
        self._fail(err, socket);
      }
    });
  }

  _fail(socket, err){
    err = err || {msg: config.AUTH_ERR_MSG};

    this.io.to(socket.socketId).emit("error", {err: err.msg});
  }
}

async function getAllMessages(user){
  try{
    let messages = Message.find({
      $or: [{from: user.id}, {to: user.id}]
    });

    return await messages.sort("-createdAt").exec();
  }
  catch(err){
    throw err;
  }
}

async function verifyUser(id){
  return await User.findById(id).exec();
}

module.exports = MessageServer;