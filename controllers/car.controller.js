/* In this file, you will create all the code needed to perform CRUD operations using Mongoose. */

const Car = require('../models/car.model.js');
const mongoose = require('mongoose');

// Create new Car
exports.create = function(car) {
    // Create and Save a new car

    let carModel = new Car({
        model: car.model,
        make: car.make,
        owner: car.owner,
        registration: car.registration,
        address: car.address
    });

    carModel.save(function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error occurred while creating the blog." });
        } else {
            console.log(data);
            res.send('The blog has been added');
        }
    });
};

// find all cars in Database
exports.findAll = function (req, res) {
    Car.find(function (err, car) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error occurred while retrieving blogs." });
        } else {
            res.send(Car);
        }
    });
}

// update Car by ID
exports.updateById = function (carId, newCar) {

    let query = { _id: carId };
    let update = { ...newCar };
    console.log('new car to be updated : ', update)
    
    Car.findByIdAndUpdate(query, { newCar }, { new: true }, function (err, doc) {
        if (err) {
            console.log("Something wrong when updating data! - ", err);
            res.send("ERROR: Not Updated. " + err);
        }
        res.send("Updated");
    });
}


// Delete Specific car by ID
exports.deleteCarById = function (req, res) {
    console.log('req ID  in Controller :', req._id);

    Car.findOneAndRemove({ _id: req._id }, function (err) {
        if (err) {
            console.log("ERROR: Car NOT removed. " + err);
            res.send("ERROR: Car NOT removed. " + err);
        }
        res.send("Cars Deleted");
    });
}