const service = require("../services/taskService");

const createTask = async (req, res) => {
  try {

    const { todo } = req.body;

    if (!todo) {
      return res.status(400).json({
        message: "Title is required"
      });
    }

    const task = await service.createTask(req.body);

    res.status(201).json({
      message: "Task Created",
      task
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getAllTasks = async (req, res) => {
  try {

    const keyword = req.query.search;

    let tasks;

    if (keyword) {
      const Task = require("../models/Task");

      tasks = await Task.find({
        todo: {
          $regex: keyword,
          $options: "i"
        }
      });
    } else {
      tasks = await service.getAllTasks();
    }

    res.json(tasks);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getTaskById = async (req, res) => {
  try {

    const task = await service.getTaskById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json(task);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateTask = async (req, res) => {
  try {

    const task = await service.updateTask(
      req.params.id,
      req.body
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json({
      message: "Task Updated",
      task
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateStatus = async (req, res) => {
  try {

    const task = await service.updateTask(
      req.params.id,
      {
        completed: req.body.completed
      }
    );

    res.json({
      message: "Status Updated",
      task
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const deleteTask = async (req, res) => {
  try {

    const task = await service.deleteTask(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json({
      message: "Task Deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  updateStatus,
  deleteTask
};