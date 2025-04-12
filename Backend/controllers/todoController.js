const Todo = require("../models/todoModel.js");

const getTodos = async (req, res) => {
  const todos = await Todo.find({ userId: req.user.id });
  res.json(todos);
};

const createTodo = async (req, res) => {
  const todo = await Todo.create({ userId: req.user.id, task: req.body.task });
  res.status(201).json(todo);
};

const updateTodo = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Updating Todo with ID:", req.params.id);

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Ensures validation runs on update
    });

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
