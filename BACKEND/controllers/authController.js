const User = require("../models/User.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function registerUser(req, res) {
  let { name, email, password } = req.body;

  try {
    const duplicate = await User.findOne({ email });

    if (duplicate) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashPass });
    await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (e) {
    console.log(e.message);
    return res.json({ success: false, message: e.message });
  }
}

async function loginUser(req, res) {
  let { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "18d",
    });

    res.cookie("taskifyUserToken", token, {
      httpOnly: true,
      maxAge: 18 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production", // true only in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Lax for localhost
      path: "/",
    });

    res.json({
      success: true,
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (e) {
    console.log(e);
    return res.json({ success: false, message: e.message });
  }
}

async function logoutUser(req, res) {
  try {
    res.clearCookie("taskifyUserToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (e) {
    console.log(e.message);
    return res.json({ success: false, message: e.message });
  }
}

async function userDetails(req, res) {
  try {
    const user = await User.findById(req.userId)
      .populate("tasks")
      .select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const allTasks = user.tasks;
    let yetToStart = [];
    let inProgress = [];
    let completed = [];

    allTasks.map((item) => {
      if (item.status === "yetToStart") {
        yetToStart.push(item);
      } else if (item.status === "inProgress") {
        inProgress.push(item);
      } else if (item.status === "completed") {
        completed.push(item);
      }
    });

    res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      tasks: {
        yetToStart,
        inProgress,
        completed,
      },
    });
  } catch (e) {
    console.log(e.message);
    return res.json({ success: false, message: e.message });
  }
}

async function isAuthenticated(req, res) {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    res
      .status(200)
      .json({ success: true, message: "User is authenticated", user });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
}

const AuthController = {
  registerUser,
  loginUser,
  logoutUser,
  userDetails,
  isAuthenticated,
};

module.exports = AuthController;
