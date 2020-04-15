/* Although MongoDB is schemaless, Mongoose works with schemas.
Remember, a schema describes what data is in a database and how it is organised and structured.  */

const mongoose = require("mongoose");

const CarSchema = mongoose.Schema({
  model: {
    type: Number,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  registration: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Car", CarSchema);