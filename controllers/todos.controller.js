const asyncHandler = require("express-async-handler");
const { writeTodos, readTodos } = require("../data/todosStore");


export const create: RequestHandler<{}, Todo | ErrorBody, CreateBody> = async (req, res) => { … };


exports.create = asyncHandler(async (req, res) => {
  const payload = req.body;
  if (!payload)
    return res.status(400).json({ error: "Todo payloa dis empty." });
  if (!payload.title) return res.status(400).json({ error: "Title is empty." });
  else {
    const todos = await readTodos();
    const todo = {
      id: todos.length ? Math.max(...todos.map((t) => Number(t.id))) + 1 : 1,
      title: payload.title,
      done: payload.done || false,
    };
    todos.push(todo);
    await writeTodos(todos);
    return res.status(201).json(todo);
  }
});

exports.getAll = asyncHandler(async (req, res) => {
  const todos = await readTodos();
  return res.status(200).json(todos);
});

exports.getOne = asyncHandler(async (req, res) => {
  const todos = await readTodos();
  if (!todos || !todos.length)
    return res.status(404).json({ error: "Todo not found" });
  else {
    const todoId = req.params.id;
    if (!todoId) return res.status(404).json({ error: "No tdod is passed" });
    else {
      const todo = todos.find((t) => t.id === Number(todoId));
      if (!todo)
        return res
          .status(404)
          .json({ error: `No todo for todoId ${todoId} is found` });
      else {
        return res.status(200).json(todo);
      }
    }
  }
});

exports.update = asyncHandler(async (req, res) => {
  try {
    const todoId = req.params.id;
    const todo = req.body;
    const todos = await readTodos();
    if (!todos || !todos.length)
      return res.status(404).json({ error: "No todos in the list" });
    else {
      const todoIndex = todos.findIndex((t) => t.id === Number(todoId));
      if (todoIndex < 0)
        return res.status(404).json({ error: "Todo not found" });
      else {
        let updatedTodo = todos[todoIndex];
        updatedTodo = { ...updatedTodo, ...todo };
        todos[todoIndex] = updatedTodo;
        await writeTodos(todos);
        return res.json(updatedTodo);
      }
    }
  } catch (err) {
    console.log("Failed with", err);
  }
});

exports.patch = asyncHandler(async (req, res) => {
  const todoId = req.params.id;
  const payload = req.body;
  if (Object.keys(payload)?.length === 0) {
    return res.status(400).json({ error: "No keys are passed for patching." });
  } else {
    const todos = await readTodos();
    const updateTodoIndex = todos.findIndex((t) => t.id === Number(todoId));
    todos[updateTodoIndex] = { ...todos[updateTodoIndex], ...payload };
    await writeTodos(todos);
    return res.json(todos[updateTodoIndex]);
  }
});

exports.delete = asyncHandler(async (req, res) => {
  const todoId = req.params.id;
  if (!todoId)
    return res.status(400).json({ error: "No todoId is passed to delete" });
  else {
    const todos = await readTodos();
    if (!todos || !todos.length)
      return res.status(404).json({ error: "No todos found to delete" });
    else {
      const todoIndex = todos.findIndex((t) => t.id === Number(todoId));
      if (todoIndex < 0)
        return res
          .status(404)
          .json({ error: `No todo for tdodId ${todoId} found` });
      todos.splice(todoIndex, 1);
      await writeTodos(todos);
      return res.status(200).json({ message: "Deleted succesfully" });
    }
  }
});
