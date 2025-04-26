const User = require("../models/User.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function registerUser(req, res) {
  let { name, email, password } = req.body;

  try {
    const duplicate = await User.find({ email });

    if (duplicate && duplicate.length > 0) {
      return res.status(400).send("Email already registered");
    }

    hashPass = bcrypt.hash(password , 10);
    
    const user = new User({ firstName, lastName, email, password:hashPass });
    await user.save();

    res.status(201).send({
      success : true,
      message: "User registered successfully",
      user,
    });
  } catch (e) {
    console.log(e.message);
    return res.json({ success : false , message : e.message});
  }
}

async function loginUser(req, res) {
  let { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }
    const isMatch = await bcrypt.compare(password , user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid email or password");
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "18d",
    });

    res.cookie("taskifyUserToken" , token , {
      httpOnly : true,
      maxAge : 18*24*60*60*1000,
      secure : process.env.NODE_ENV === "production",
      sameSite : "None"
    })

    res.send({
      success : true,
      message: "User logged in successfully",
      token,
    });
  } catch (e) {
    console.log(e.message);
    return res.json({ success : false , message : e.message});
  }
}

const AuthController = {
  registerUser,
  loginUser,
};

module.exports = AuthController;
