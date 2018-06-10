/* eslint-disable no-undef */

let express = require("express");
let path = require("path");
let logger = require("morgan");
let bodyParser = require("body-parser");
let compress = require("compression");
let mongoose = require("mongoose");
let Fawn = require("fawn");

mongoose.Promise = global.Promise = require("bluebird");

let {DB_URL, PORT} = require("./config/index.js");
let apiRouter = require("./app/api");
let MessageServer = require("./app/api/messaging");

const STATIC = path.join(__dirname, "public");

mongoose.Promise = Promise;
mongoose.connect(DB_URL);
Fawn.init(mongoose);

let app = express();

app.use(compress());
app.use(logger("dev"));
app.use(bodyParser.json());

app.use(express.static(STATIC));

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,HEAD,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,Authorization,x-access-token");
  res.setHeader("X-Powered-By", "The tears of children");
  next();
});

app.use("/api",apiRouter);

app.use("*", (req, res) => {
  res.sendFile(`${STATIC}/index.html`);
});

if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
    console.log("Error: " + err.stack);
    next(err);
  });
}

// rollback fawn tasks
(async () => {
  try{await Fawn.Roller().roll();}
  catch(err){console.log(err);}
})();

// start the server
let server = app.listen(PORT, "0.0.0.0");
let messageServer = new MessageServer(server);

messageServer.start();

server.on("close", async err => {
  if(err) throw err;

  console.log("\nClosing db connections...\n");
  await mongoose.disconnect();
  console.log("Server Out!! *drops mic*");
});

process.on("SIGINT", () => server.close());

console.log("Magic happens at http://localhost:" + PORT);
