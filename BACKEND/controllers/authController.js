const User = require("../models/User");
const jwt = require("jsonwebtoken");
require('dotenv').config;

async function registerUser(req, res) {
  let { fisrtName, lastName, email, password } = req.body;

  try {
    const duplicate = await User.find({ email });

    if (duplicate && duplicate.length > 0) {
      return res.status(400).send("Email already registered");
    }
    const user = new User({ fisrtName, lastName, email, password });
    await user.save();
    res.status(201).send({
      message: "User registered successfully",
      user,
    });
  } catch (e) {
    res.status(400).send(e);
  }
}

async function loginUser(req, res) {
  let { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send("Invalid email or password");
    }
    const token = jwt.sign(
        { userId : user._id }, 
        process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.send({
      message: "User logged in successfully",
      token,
    });
  } catch (e) {
    res.status(400).send(e);
  }
}

const AuthController = {
  registerUser,
  loginUser
};

module.exports = AuthController;
