// loginRoutes.js
// 로그인 라우터 

const express = require('express');
const router = express.Router({ mergeParams: true });
const userController = require('../controller/userController');
const passport = require('passport');

router.get('/', userController.signIn);
router.post('/', passport.authenticate('local-signIn', {
    successRedirect: '/',
    failureRedirect: '/error',
    failureFlash: true
}));


module.exports = router;