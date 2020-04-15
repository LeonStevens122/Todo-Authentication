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
const carRoutes = express.Router();
const mongoose = require("mongoose");
const Car = require('./models/car.model.js');

const dotenv = require('dotenv');
//app.use(dotenv);
require('dotenv').config();

dotenv.config();


const PORT = process.env.PORT || 3001;
const mongoUser = process.env.MONGOUSER;
const mongoPassword = process.env.MONGOPASS;

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

// secure application

app.use(helmet());

require("dotenv").config();




app.use('/cars', carRoutes);

// route returns all of the cars in the database
carRoutes.route('/').get(function (req, res) {
    Car.find(function (err, cars) {
        if (err) {
            console.log(err);
        } else {
            res.json(cars);
        }
    });
});


carRoutes.route('/add/').post( function (req, data)  {
    console.log(' Body Contents : ', req.body);
    let newCar = req.body;
    console.log( 'newcar', newCar);

    Car.create(newCar);
});

carRoutes.route('/updateOne/').post(function (req, data) {

    console.log(' Body Contents : ', req.body);
    let newCar = req.body;
    console.log('newcar', newCar);
    let carId = newCar._id;

    Car.updateById(carId,  newCar);


});

// route returns a specific car by the ID
carRoutes.route('/findID/:id').get(function (req, res) {
    const id = req.params.id;
    console.log('ID to Search For : ', id)
    Car.findById(id, function (err, cars) {
        res.json(cars);
        });
});


// // Update single item
// carRoutes.route('/update/:id').post(function (req, res) {
//    Car.findById(req.params.id, function (err, car) {
//        if (!car)
//            res.status(404).send('Car not Found');
//        else {
//            car.model = req.body.model,
//            car.make = req.body.make,
//            car.owner = req.body.owner,
//            car.address = req.body.address
//             }
//        });
//    }
// );


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// function to add new car to the database
//app.post('/add', async function (req, res) {
//});

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

// connect to URI

const MongoClient = require('mongodb').MongoClient;

const uri = ('mongodb+srv://' + mongoUser + ':' + mongoPassword + '@hyperion-dev-leon-stevens-webdev-qiwgg.mongodb.net/test?retryWrites=true&w=majority');

mongoose.Promise = global.Promise;

const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });

client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

mongoose.connect(uri);

mongoose.connection.on('error', function (err) {
    console.log('Connection to Mongo established.');
   console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

mongoose.connection.once('open', function () {
    console.log("Successfully connected to the database");
});

app.set("port", process.env.PORT || 3000);

console.log("App Listening on port : ", process.env.PORT);

var server = app.listen(app.get("port"), function () {
    debug("Express server listening on port " + server.address().port);
    console.log('Mongo USer', mongoUser)
});
