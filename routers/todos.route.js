const express = require("express");
const controller = require("../controllers/todos.controller");
const route = express.Router();
const validate = require("../middlewares/validate");
const {
  createSchema,
  updateSchema,
  patchSchema,
} = require("../schemas/todos.schema");

route.get("/", controller.getAll);
route.get("/:id", controller.getOne);
route.delete("/:id", controller.delete);
route.put("/:id", validate(updateSchema), controller.update);
route.post("/", validate(createSchema), controller.create);
route.patch("/:id", validate(patchSchema), controller.patch);

module.exports = route;
