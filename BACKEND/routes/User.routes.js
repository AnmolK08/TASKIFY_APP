const express = require('express');
const AuthContoller = require('../controllers/authController');
const authenticateToken = require('../middleware/authjwt');
const userRouter = express.Router();

userRouter.post('/register' , AuthContoller.registerUser);
userRouter.post('/login', AuthContoller.loginUser);
userRouter.post('/logout', AuthContoller.logoutUser);
userRouter.get('/getUserDetails', authenticateToken, AuthContoller.userDetails);
userRouter.get('/isAuthenticated', authenticateToken, AuthContoller.isAuthenticated);

module.exports = userRouter;
