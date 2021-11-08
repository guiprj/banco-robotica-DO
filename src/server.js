const express = require("express");
const server = express();
const passport = require("passport");
const session = require("express-session");
require("./auth")(passport);
const routes = require("./routes");
const path = require("path");
require('dotenv').config()
const flash = require("express-flash");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


(async () => {
  const database = require('./db/config');
  try {
      const resultado = await database.sync();
  } catch (error) {
      console.log(error);
  }
})();



server.use(cookieParser("rtgjrtgj"))

server.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

server.use(flash());

server.use(passport.initialize());

server.use(passport.session());

server.use(express.json())

server.set("view engine", "ejs");

server.use(express.static("public"));

server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())

server.set("views", path.join(__dirname, "views"));

server.use(express.urlencoded({ extended: true }));

server.use(routes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("rodando"));
