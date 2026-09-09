const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const isLoggedIn = require("../middleware/auth");

const pomodoroSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  duration: Number,
  date: String
});

const pomodoroModel = mongoose.model("pomodoro", pomodoroSchema);

router.post("/", isLoggedIn, async (req, res) => {
  try {
    const { duration, date } = req.body;

    const pomodoro = new pomodoroModel({
      userId: req.user.userId,
      duration,
      date
    });

    await pomodoro.save();

    res.status(201).json(pomodoro);
  } catch (error) {
    res.status(500).json({
      message: "Failed to save Pomodoro"
    });
  }
});

router.get("/", isLoggedIn, async (req, res) => {
  try {
    const pomodoros = await pomodoroModel.find({
      userId: req.user.userId
    });

    res.json(pomodoros);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get Pomodoros"
    });
  }
});

module.exports = router;