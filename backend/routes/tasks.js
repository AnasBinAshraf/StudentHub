const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const isLoggedIn = require("../middleware/auth");

const taskSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  title: String,
  description: String,
  dueDate: String,
  priority: String,
  completed: Boolean
});

const taskModel = mongoose.model("task", taskSchema);


// Get all tasks
router.get("/", isLoggedIn, async function (req, res) {
  try {
    const tasks = await taskModel.find({
      userId: req.user.userId
    });

    res.json(tasks);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to get tasks"
    });
  }
});


// Add a task
router.post("/", isLoggedIn, async function (req, res) {
  try {
    const { title, description, dueDate, priority } = req.body;

    const task = new taskModel({
      userId: req.user.userId,
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      completed: false
    });

    await task.save();

    res.status(201).json({
      message: "Task added successfully",
      task: task
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to add task"
    });
  }
});


// Update a task
router.put("/:id", isLoggedIn, async function (req, res) {
  try {
    const task = await taskModel.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId
      },
      req.body,
      {
        new: true
      }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json({
      message: "Task updated successfully",
      task: task
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to update task"
    });
  }
});


// Delete a task
router.delete("/:id", isLoggedIn, async function (req, res) {
  try {
    const task = await taskModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json({
      message: "Task deleted successfully"
    });

  } catch (error) {
  console.log("ADD TASK ERROR:", error);

  res.status(500).json({
    message: "Failed to add task",
    error: error.message
  });
}
});


module.exports = router;