/**
 * @author EmmanuelOlaojo
 * @since 6/7/18
 */

let socketIo = require("socket.io");
let fs = Promise.promisifyAll(require("fs"));
let uniqueFilename = require("unique-filename");

let config = require("../../../config");
let auth = require("../../../utils/authToken");
let files = require("../../../utils/files");
let Message = require("../../models/messaging").Message;
let User = require("../../models/user").User;

const CHAT_MSG = "chat-message";
const ALL_MSGS = "all-messages";
const ERR = "error";

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
        delete user.password;

        self.io.to(socket.id).emit(ALL_MSGS, {messages, user});
      }
      catch (err){
        self._fail(socket, err);
      }
    });
  }

  _listen(socket){
    let self = this;

    socket.on(CHAT_MSG, async function(msg, respond){
      let token = msg[config.AUTH_TOKEN];

      try{
        let user = await auth.validateToken(token);

        if(!user){return self._fail(socket);}

        let message = new Message();
        let recipient = await verifyUser(msg.to);

        if(!recipient) {
          return self.fail(socket, {msg: "invalid recipient"});
        }

        message.from = user._id;
        message.to = recipient._id;
        message.text = msg.text || "";

        if(msg.files && msg.files.length){
          msg.files = await saveFiles(msg.files);
          msg.files = await files.uploadImages(msg.files);
          message.images = [];

          for(let file of msg.files){
            message.images.push({
              id: file._id,
              file: file
            });
          }
        }

        message = await message.save();
        message = await message
          .populate({path: "to", select: ["-password"]})
          .populate({path: "from", select: ["-password"]})
          .execPopulate();

        recipient = self.connected[message.to._id];

        if(recipient){
          self.io.to(recipient.socketId).emit(CHAT_MSG, message);
        }

        respond(message);
      }
      catch (err){
        self._fail(socket, err);
      }
    });
  }

  _fail(socket, err){
    err = err || {msg: config.AUTH_ERR_MSG};

    this.io.to(socket.id).emit(ERR, {err: err.message});
  }
}

/**
 * Saves a buffer to a file, adds, the file path to the
 * file object, and deletes the buffer.
 *
 * @param file - the file object received from client
 *        (props: "lastModified", "name", "size", "type", "buffer)
 *
 * @returns {Promise}
 */
async function saveFile(file){
  let filePath = uniqueFilename("uploads");

  try{
    await fs.writeFileAsync(filePath, file.buffer);

    file.path = filePath;
    delete file.buffer;

    return file;
  }
  catch(err){
    console.log(err);
    throw err;
  }
}

async function saveFiles(fileList){
  let result = [];

  try{
    for(let file of fileList){
      console.log(result);
      result.push(await saveFile(file));
    }

    return result;
  }
  catch(err){
    console.log(err);
    return null;
  }
}

async function getAllMessages(user){
  try{
    let messages = Message
      .find({
        $or: [{from: user.id}, {to: user.id}]
      })
      .populate({path: "to", select: ["-password"]})
      .populate({path: "from", select: ["-password"]});

    return await messages.sort("createdAt").exec();
  }
  catch(err){
    throw err;
  }
}

async function verifyUser(id){
  try{
    return await User.findById(id).exec();
  }
  catch(err){
    return await User.findOne({alias: id});
  }
}

module.exports = MessageServer;