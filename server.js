/* eslint-disable no-undef */

let express = require("express");
let path = require("path");
let logger = require("morgan");
let bodyParser = require("body-parser");
let compress = require("compression");
let mongoose = require("mongoose");
let passport = require("passport");
let cors = require("cors");
let Fawn = require("fawn");
let https = require("https");
let session = require("express-session");
let fs = require("fs");

mongoose.Promise = global.Promise = require("bluebird");

let {DB_URL, PORT} = require("./config/index.js");
let config = require("./config");
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

app.use(cors());
app.use("/api",apiRouter);


app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: config.SECRET
}));

app.use(passport.initialize());
app.use(passport.session());

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

let options = {
  key: fs.readFileSync( './config/https/localhost.key' ),
  cert: fs.readFileSync( './config/https/localhost.cert' ),
  requestCert: false,
  rejectUnauthorized: false
};
let server = https.createServer( options, app );
//let server = app.listen(PORT, "0.0.0.0");
server.listen(PORT);

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
