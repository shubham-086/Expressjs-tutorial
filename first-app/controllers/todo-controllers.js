import { readTodos, writeTodos } from "../utils/helper.js";

export const getAllTodos = (req, res) => {
  const todos = readTodos();
  res.status(200).send(todos);
};

export const getTodoById = (req, res) => {
  const { id } = req.params;
  const { eg } = req.query;
  console.log("Query:", eg);

  const todos = readTodos();
  const todo = todos.find((t) => t.id === Number(id));
  if (!todo) {
    res.status(404).send({ error: "Todo not found" });
  }
  res.status(200).send(todo);
};

export const createNewTodo = (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.send({ error: "Title and Description are required." });
  }
  const newTodo = { id: Date.now(), title, description };

  const todos = readTodos();
  todos.push(newTodo);

  writeTodos(todos);
  res.status(201).send({ todo: { title, description } });
};

export const updateTodoById = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const todos = readTodos();
  const todoIndex = todos.findIndex((t) => t.id === Number(id));

  if (todoIndex === -1) {
    res.status(404).send({ error: "Todo not found" });
  }

  todos[todoIndex] = { id: Number(id), title, description };
  writeTodos(todos);

  //   res.status(200).send(todos[todoIndex]);
  res.redirect(`/api/todos/${id}`);
};

export const partiallyUpdateTodoById = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const todos = readTodos();
  const todoIndex = todos.findIndex((t) => t.id === Number(id));

  if (todoIndex === -1) {
    res.status(404).send({ error: "Todo not found" });
  }

  if (title) {
    todos[todoIndex].title = title;
  }
  if (description) {
    todos[todoIndex].description = description;
  }

  writeTodos(todos);
  res.status(200).json({ message: "Todo updated successfully", data: todos[todoIndex] });
};

export const deleteTododById = (req, res) => {
  const { id } = req.params;
  const todos = readTodos();
  const todoIndex = todos.findIndex((t) => t.id === Number(id));

  if (todoIndex === -1) {
    res.status(404).send({ error: "Todo not found" });
  }
  todos.splice(todoIndex, 1);

  writeTodos(todos);
  res.status(200).send({ message: "Todo deleted successfully" });
};
