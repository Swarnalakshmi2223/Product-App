const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


// ================= REGISTER =================

router.post("/register", async (req, res) => {
  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });

  }
});


// ================= LOGIN =================

router.post("/login", async (req, res) => {

  try {

    console.log("LOGIN API CALLED");

    const { email, password } = req.body;

    console.log("Email:", email);

    if (!email || !password) {

      return res.status(400).json({
        message: "Email and password are required",
      });

    }


    // Find user
    const user = await User.findOne({ email });

    console.log("User found:", !!user);


    if (!user) {

      return res.status(401).json({
        message: "Invalid email or password",
      });

    }


    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    console.log("Password correct:", isPasswordCorrect);


    if (!isPasswordCorrect) {

      return res.status(401).json({
        message: "Invalid email or password",
      });

    }


    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );


    console.log("JWT created successfully");


    res.status(200).json({

      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },

    });


  } catch (error) {

    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });

  }

});


module.exports = router;