// registerRoutes.js
// 회원가입 라우트 

const express = require('express');
const router = express.Router({ mergeParams: true });
const userController = require('../controller/userController');
const passport = require('passport');

router.get('/', userController.signUp);
router.post('/', passport.authenticate('local-signUp', {
    successRedirect: '/',
    failureRedirect: '/error',
    failureFlash: true
}));

module.exports = router;