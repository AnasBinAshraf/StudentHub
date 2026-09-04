const mongoose = require("mongoose");

const userschema = mongoose.Schema({
  name: String,
  email: String,
  password: String
});

module.exports = mongoose.model("user", userschema);