const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers["token"];
    if (!token) {
      return res.status(401).send("No token provided");
    }
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
};

module.exports = authenticateToken;
