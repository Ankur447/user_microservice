const express = require('express');
const router = express.Router();
const RegistrstionController = require('../Controller/RegistrstionController');
const LoginController = require('../Controller/LoginController');

router.post('/register', RegistrstionController.registerUser);
router.post('/login', LoginController.Login);

module.exports = router;
