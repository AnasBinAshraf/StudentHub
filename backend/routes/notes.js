const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const isLoggedIn = require("../middleware/auth");

const noteSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  title: String,
  content: String,
  date: String
});

const noteModel = mongoose.model("note", noteSchema);


// Get all notes
router.get("/", isLoggedIn, async function (req, res) {
  try {
    const notes = await noteModel.find({
      userId: req.user.userId
    });

    res.json(notes);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to get notes"
    });
  }
});


// Add a note
router.post("/", isLoggedIn, async function (req, res) {
  try {
    const { title, content, date } = req.body;

    const note = new noteModel({
      userId: req.user.userId,
      title: title,
      content: content,
      date: date
    });

    await note.save();

    res.status(201).json({
      message: "Note added successfully",
      note: note
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to add note"
    });
  }
});

// Update a note
router.put("/:id", isLoggedIn, async function (req, res) {
  try {
    const note = await noteModel.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId
      },
      {
        title: req.body.title,
        content: req.body.content
      },
      {
        new: true
      }
    );

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    res.json({
      message: "Note updated successfully",
      note: note
    });

  } catch (error) {
    console.log("UPDATE NOTE ERROR:", error);

    res.status(500).json({
      message: "Failed to update note"
    });
  }
});

// Delete a note
router.delete("/:id", isLoggedIn, async function (req, res) {
  try {
    const note = await noteModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    res.json({
      message: "Note deleted successfully"
    });

  } catch (error) {
    console.log("DELETE NOTE ERROR:", error);

    res.status(500).json({
      message: "Failed to delete note"
    });
  }
});


module.exports = router;