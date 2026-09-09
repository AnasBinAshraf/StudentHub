const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const isLoggedIn = require("../middleware/auth");

const subjectGoalSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  subject: String,
  goalMinutes: {
    type: Number,
    default: 0
  }
});

const subjectGoalModel = mongoose.model("subjectGoal", subjectGoalSchema);

router.post("/", isLoggedIn, async (req, res) => {
  try {
    const { subject, goalMinutes } = req.body;

    const goal = await subjectGoalModel.findOneAndUpdate(
      {
        userId: req.user.userId,
        subject
      },
      {
        goalMinutes
      },
      {
        new: true,
        upsert: true
      }
    );

    res.json(goal);
  } catch (error) {
    res.status(500).json({
      message: "Failed to save subject goal"
    });
  }
});

router.get("/", isLoggedIn, async (req, res) => {
  try {
    const goals = await subjectGoalModel.find({
      userId: req.user.userId
    });

    res.json(goals);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get subject goals"
    });
  }
});

module.exports = router;