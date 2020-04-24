const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for Todo Collection
const todoSchema = new Schema({
  index: {
    type: Number,
    required: true,
    trim: true,
  },
  value: {
    type: String,
    required: true,
    trim: true,
  },
  done: {
    type: Boolean,
    required: true,
  },
  User: {
    type: mongoose.Schema.Types.ObjectId, // creates a link from one collection/model to another
    required: true,
      ref: "username",
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
