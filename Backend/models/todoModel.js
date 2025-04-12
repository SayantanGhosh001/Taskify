const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  task: { type: String, required: true },
  completed: { type: Boolean, default: false }
},{timestamps:true});

const Todo = mongoose.model("Todo",todoSchema);

module.exports = Todo;