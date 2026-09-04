const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
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

router.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({
      email: email
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      message: "Login successful",
      token: token
    });

  } 
  catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Login failed"
    });
  }
});
module.exports = router;