const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const indexRouter = require("./routes/index");
const tasksRouter = require("./routes/tasks");
const notesRouter = require("./routes/notes");
const studyRouter = require("./routes/study");
const studyGoalRouter = require("./routes/studyGoal");
const SubjectGoal = require("./routes/SubjectGoal");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", indexRouter);
app.use("/tasks", tasksRouter);
app.use("/notes", notesRouter);
app.use("/study", studyRouter);
app.use("/study-goal", studyGoalRouter);
app.use("/subject-goals", SubjectGoal);

mongoose.connect(process.env.MONGO_URI)
  .then(function () {
    console.log("MongoDB connected");
  })
  .catch(function (err) {
    console.log("MongoDB connection error:", err);
  });

app.get("/", function (req, res) {
  res.send("StudentHub Backend is running");
});

app.listen(5000, function () {
  console.log("Server running on port 5000");
});