"use strict";
const debug = require("debug");
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const Axios = require("axios");
const cors = require("cors");
const app = express();
const userRoutes = express.Router();
const todoRoutes = express.Router();
const authRoutes = express.Router();
const mongoose = require("mongoose");
const Car = require("./models/car.model.js");
const dotenv = require("dotenv");
const User = require("./models/user-model");
const Todo = require("./models/todo-model");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const uid = require("uid-safe");
const session = require("express-session");

require("./Config/passport-setup");

const assert = require("assert");

//app.use(dotenv);
require("dotenv").config();

dotenv.config();

const PORT = process.env.PORT || 3001;
const mongoUser = process.env.MONGOUSER;
const mongoPassword = process.env.MONGOPASS;

// connect to URI
const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://" +
  mongoUser +
  ":" +
  mongoPassword +
  "@hyperion-dev-leon-stevens-webdev-qiwgg.mongodb.net/Todo?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});


let userTodos = [];
const filter = {};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// uncomment after placing your favicon in /public
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

// secure application
app.use(helmet());
require("dotenv").config();

app.use("/users", userRoutes);
app.use("/todo", todoRoutes);
app.use("/auth", authRoutes);

// Google Authentication route

authRoutes.route("/google").get(
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

authRoutes.route("/logout").get(function (req, res) {
  req.logout();
  console.log("Logged out");
  req.session = null;
    res.redirect("http://localhost:3000");
});


// Get the Specific USer's Todo's


const findUserTodos = async () => {
    return await Todo.find({ "googleId": { $eq: req.user.googleId } }, (err, data) => {
        if (err) return done(err);
        return done(null, data)
    });

};


// Authentication - Redirect
authRoutes
  .route("/google/redirect")
    .get(passport.authenticate("google"), (req, res) => {
       
        Todo.find({ "googleId": { $eq: req.user.googleId } }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
               // res.json(data);
                console.log("Todos : ", data)
            }
        });

        console.log('User Todos', userTodos);
        
       
        
        res.redirect("/Todo")
  });

// Get all users from the database
userRoutes.route("/").get(function (req, res) {
  User.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

// Get all the TodoItems
todoRoutes.route("/").get(function (req, res) {
  Todo.find(function (err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

// add a new Todo
todoRoutes.route("/add/").post(function (req, res) {
  let todoModel = new Todo({
    index: 1,
    value: "Testing",
    done: false,
    User: "5ea033e99502546c68994cdf",
  });

  todoModel.save(function (err, data) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occurred while creating the Todo." });
    } else {
      console.log(data);
      res.send("The Todo has been added");
    }
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {},
  });
});

const sessionConfig = {
  secret: uid.sync(18),
  cookie: {
    maxAge: 86400 * 1000, // 24 hours in milliseconds
  },
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessionConfig));

mongoose.Promise = global.Promise;

client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

mongoose.connect(uri);

mongoose.connection.on("error", function (err) {
  console.log("Connection to Mongo established.");
  console.log("Could not connect to the database. Exiting now...", err);
  process.exit();
});

mongoose.connection.once("open", function () {
  console.log("Successfully connected to the database");
});

app.set("port", process.env.PORT || 3000);

console.log("App Listening on port : ", process.env.PORT);

var server = app.listen(app.get("port"), function () {
  debug("Express server listening on port " + server.address().port);

  console.log("USer Routes", userRoutes.route("/"));
  // console.log('Car Routes', carRoutes);
  console.log("USer Schema", User);
  console.log("Car Schema", User);

  console.log("Mongo USer", mongoUser);
});
