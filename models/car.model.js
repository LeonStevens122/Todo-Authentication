/* Although MongoDB is schemaless, Mongoose works with schemas.
Remember, a schema describes what data is in a database and how it is organised and structured.  */
const mongoose = require("mongoose");

const CarSchema = mongoose.Schema({
  model: {
    type: String,
    required: false,
  },
  make: {
    type: String,
    required: false,
  },
  owner: {
    type: String,
    required: false,
  },
  registration: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  }
});

module.exports = mongoose.model("Car", CarSchema);