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
    Car.find( function (err, cars) {
        if (err) {
            console.log(err);
        } else {
            res.json(cars);
        }
    });
});

// Route to Add New Car item to Database
carRoutes.route('/add/').post( function (req, res)  {
    
    let newCar = req.body;
   
    Car.create(newCar);

    res.send('Car Added')
});

// update single car
carRoutes.route('/updateOne/:id').patch(async (req, res) => {

    const updates = Object.keys(req.body);

    try {
        const car = await Car.findOne({ _id: req.params.id });
        // find id passed into the function
        if (!car) { return res.status(404).send(404).send() }
        updates.forEach((update) => {
            Car[update] = req.body[update]
            // update the values and keys dynamically
        })
        await car.save();
        res.status(200).send(car);
    } catch (e) {
        res.status(400).send(e);
        console.error('Error Message  : ', e);
    }
});

carRoutes.route('/updateInBulk/').put(function (req, res) {
    let oldvalue = req.body.oldMake;
    let newvalue = req.body.newMake;
    try {
        Car.updateMany({ make: { $eq: oldvalue } }, {
            $set: { make: newvalue }
        })
    } catch (e) { console.log('Error Message try :', e) };

    res.send('Successfully updated');


});

// route returns a specific car by the ID
carRoutes.route('/findID/:id').get(function (req, res) {
    const id = req.params.id;
    console.log('ID to Search For : ', id)
    Car.findById(id, function (err, cars) {
        res.json(cars);
        });
});
// Delete single Car
carRoutes.route('/deleteOne/').delete((req, res) => {

    console.log('req.body : ', req.body._id);
    let delId = req.body._id;
    console.log('red _id : ', delId);
    try {
        Car.findOneAndDelete({ _id: delId })
    } catch (e) { console.log('Error Message try :', e) };

   
    res.send('Car deleted.')

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
