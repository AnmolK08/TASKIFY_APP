const express = require('express');
const AuthContoller = require('../controllers/authController');
const router = express.Router();

router.post('/register' , AuthContoller.registerUser);
router.post('/login', AuthContoller.loginUser);
