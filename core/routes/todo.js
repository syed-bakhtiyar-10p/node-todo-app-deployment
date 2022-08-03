const express = require("express");
const router = express.Router();

module.exports = (todoService) => {
  const validateInput =
    require("../../shared/utils/input-validation-middleware")();
  const errorMiddleware = require("../../shared/utils/error-middleware");

  router.post(
    "/todo",
    validateInput,
    async (req, res, next) => {
      try {
        await todoService.createTodo(req.body);
        return res.json({ message: "ok" });
      } catch (e) {
        res.status(500);
        return next("internal server error");
      }
    },
    errorMiddleware.errorMiddleware
  );

  router.get("/todo", async (req, res, next) => {
    try {
      const todoList = await todoService.getTodo();
      return res.json(todoList);
    } catch (e) {
      res.status(500);
      return next("internal server error");
    }
  });

  return router;
};
