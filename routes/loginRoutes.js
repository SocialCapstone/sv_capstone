// loginRoutes.js
// 로그인 라우터 

const express = require('express');
const router = express.Router({ mergeParams: true });
const userController = require('../controller/userController')

router.get('/', userController.signIn);
router.post('/', userController.postLogin);


module.exports = router;