import { Router } from "express";
import { readTodos, writeTodos } from "../utils/helper.js";
const router = Router();

// Get all todos
router.get("/", (req, res) => {
  const todos = readTodos();
  res.send(todos);
});

// Create a new todo
router.post("/", (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.send({ error: "Title and Description are required." });
  }

  const newTodo = { id: Date.now(), title, description };

  const todos = readTodos();
  todos.push(newTodo);

  writeTodos(todos);

  res.send({ todo: { title, description } });
});

export default router;
