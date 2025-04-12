const { z } = require("zod");

const todoSchema = z.object({
  task: z.string().min(1, "Task is required"),
});

const validateTodo = (req, res, next) => {
  try {
    todoSchema.parse(req.body);
    next();
  } catch (err) {
    res.status(400).json({ error: err.errors[0].message });
  }
};

module.exports = { validateTodo };
