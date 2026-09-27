const express = require("express");
require("dotenv").config();

const todoRoute = require("./routers/todos.route");
const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());

app.use("/todos", todoRoute);

app.use((err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .json({ success: false, message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
