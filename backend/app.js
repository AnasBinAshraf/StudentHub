const indexRouter = require("./routes/index");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", indexRouter);

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