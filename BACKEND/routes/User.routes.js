const express = require('express');
const AuthContoller = require('../controllers/authController');
const userRouter = express.Router();

userRouter.post('/register' , AuthContoller.registerUser);
userRouter.post('/login', AuthContoller.loginUser);

module.exports = userRouter;
