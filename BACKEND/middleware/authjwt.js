const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
require("dotenv").config();

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.taskifyUserToken;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authenticateToken;
