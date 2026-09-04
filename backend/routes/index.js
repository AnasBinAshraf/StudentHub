const express = require("express");
const router = express.Router();

const userModel = require("./users");
const bcrypt = require("bcryptjs");

router.post("/register", async function (req, res) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({
      email: email
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      name: name,
      email: email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Registration failed"
    });
  }
});

module.exports = router;