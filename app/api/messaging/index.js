/**
 * @author EmmanuelOlaojo
 * @since 6/7/18
 */

let socketIo = require("socket.io");

let config = require("../../../config");
let auth = require("../../../utils/authToken");
let Message = require("../../models/messaging").Message;

class MessageServer{

  constructor(server){
    let self = this;
    self.server = server;
    self.connected = {};
    let io = self.io = socketIo(server);

    io.on("connection", async function(socket){
      let token = socket.handshake.query[config.AUTH_TOKEN];

      try{
        let user = await auth.validateToken(token);

        if(!user){
          return self._fail(socket);
        }

        self._listen(socket);

        self.connected[user._id] = {
          socketId: socket.id,
          user: user
        };

        let messages = await getAllMessages(user);

        io.to(socket.id).emit("all-messages", messages);
      }
      catch (err){
        self._fail(err, socket);
        socket.disconnect(true);
      }
    });
  }

  _listen(socket){
    let self = this;

    socket.on("chat-message", async function(msg){
      let token = msg[config.AUTH_TOKEN];

      try{
        let user = await auth.validateToken(token);

        if(!user){
          return self._fail(socket);
        }

        let message = new Message();

        message.from = user._id;
        message.to = msg.to; // make sure msg.to is valid user id
        message.text = msg.text;

        message = await message.save();
      }
      catch (err){
        self._fail(err, socket);
      }
    });
  }

  _fail(socket, err){
    err = err || {msg: config.AUTH_ERR_MSG};

    this.io.to(socket.id).emit("error", {err: err.msg});
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

module.exports = MessageServer;