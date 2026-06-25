const express = require("express");

const router = express.Router();

const controller =
require("../controllers/taskController");

router.post("/tasks", controller.createTask);

router.get("/tasks", controller.getAllTasks);

router.get("/tasks/:id", controller.getTaskById);

router.put("/tasks/:id", controller.updateTask);

router.patch(
  "/tasks/:id/status",
  controller.updateStatus
);

router.delete(
  "/tasks/:id",
  controller.deleteTask
);

module.exports = router;