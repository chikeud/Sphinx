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

  /**
   * Initialize necessary variables
   *
   * @param server - app server
   */
  constructor(server){
    let self = this;
    self.server = server;
    self.connected = {};
    self.io = socketIo(server);
  }

  /**
   * Start listening for connections. When users
   * connect, they are added to the "connected"
   * object which is sort of a map of all the
   * connected users and contains useful info
   * about the users.
   */
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

  /**
   * Listens for chat messages. When a message
   * arrives, it's files are processed and stored
   * along with other relevant properties. The created
   * message is then pushed to the sender and the
   * recipient, if the latter is online.
   *
   * @param socket - an instance of a connected socket
   *
   * @private - this function is private
   */
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

  /**
   * Notifies the client of an error
   *
   * @param socket - an instance of a connected socket
   * @param err - error to report
   *
   * @private - this function is private
   */
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

/**
 * Saves a list of files to the file system
 *
 * @see saveFile
 *
 * @param fileList - List of files
 *
 * @return {Promise<*>} - resolves with list of saved files
 */
async function saveFiles(fileList){
  let result = [];

  try{
    for(let file of fileList){
      result.push(await saveFile(file));
    }

    return result;
  }
  catch(err){
    console.log(err);
    return null;
  }
}

/**
 * Gets all the messages related to a user
 *
 * @param user - to get messages for
 *
 * @return {Promise<*>} - resolves with all of user's messages
 */
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

/**
 * Verifies that an id or alias belongs to a
 * user.
 *
 * @param id - or alias in question
 *
 * @return {Promise<*>} - resolves with found user
 */
async function verifyUser(id){
  try{
    return await User.findById(id).exec();
  }
  catch(err){
    return await User.findOne({alias: id});
  }
}

module.exports = MessageServer;