const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const isLoggedIn = require("../middleware/auth");

const studySchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  subject: String,
  duration: Number,
  date: String
});

const studyModel = mongoose.model("study", studySchema);

router.post("/", isLoggedIn, async (req, res) => {
  try {
    const { subject, duration, date } = req.body;

    const study = new studyModel({
      userId: req.user.userId,
      subject,
      duration,
      date
    });

    await study.save();

    res.status(201).json(study);
  } catch (error) {
    res.status(500).json({ message: "Failed to save study session" });
  }
});

router.get("/", isLoggedIn, async (req, res) => {
  try {
    const studies = await studyModel.find({
      userId: req.user.userId
    });

    res.json(studies);
  } catch (error) {
    res.status(500).json({ message: "Failed to get study sessions" });
  }
});

router.put("/:id", isLoggedIn, async (req, res) => {
  try {
    const { subject } = req.body;

    const study = await studyModel.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId
      },
      {
        subject
      },
      {
        new: true
      }
    );

    if (!study) {
      return res.status(404).json({
        message: "Study session not found"
      });
    }

    res.json(study);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update study session"
    });
  }
});

router.delete("/:id", isLoggedIn, async (req, res) => {
  try {
    const study = await studyModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!study) {
      return res.status(404).json({
        message: "Study session not found"
      });
    }

    res.json({
      message: "Study session deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete study session"
    });
  }
});

module.exports = router;