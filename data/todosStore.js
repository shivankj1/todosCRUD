const path = require("path");
const fs = require("fs/promises");

const TODOS_FILE = path.join(__dirname, "todos.json");

const readTodos = async () => {
  try {
    const raw = await fs.readFile(TODOS_FILE, "utf-8");
    const todos = JSON.parse(raw);
    return todos;
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
};

const writeTodos = async (todos) => {
  if (!todos) return;
  fs.writeFile(TODOS_FILE, JSON.stringify(todos));
};

module.exports = { readTodos, writeTodos };
