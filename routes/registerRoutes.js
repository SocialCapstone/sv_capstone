// registerRoutes.js
// 회원가입 라우트 

const express = require('express');
const router = express.Router({ mergeParams: true });
const userController = require('../controller/userController');

router.get('/', userController.signUp);
router.post('/', userController.postRegister);

module.exports = router;