const express = require('express');
const validate = require('../Middleware/Validate-Middleware');
const validationSchena = require('../Validation/AuthValidation');
const router = express.Router();
const {UserRegister, Loginuser, userData} = require("../Controller/AuthController");
const authMidware = require('../Middleware/authMiddleware');
const LoginValidation = require('../Validation/LoginValidation');


router.route('/register').post(validate(validationSchena),UserRegister);
router.route('/login').post(validate(LoginValidation),Loginuser);
router.route('/userData').get(authMidware, userData);

module.exports = router;