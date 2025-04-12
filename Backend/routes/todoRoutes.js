const express = require("express");
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const { validateTodo } = require("../middleware/validation.js");

const router = express.Router();

router.get("/", authMiddleware, getTodos);
router.post("/", authMiddleware, validateTodo, createTodo);
router.put("/:id", authMiddleware, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);

module.exports = router;
