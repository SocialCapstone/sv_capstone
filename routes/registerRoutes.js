// registerRoutes.js
// 회원가입 라우트 

const express = require('express');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
    res.render('user/register');
})

router.post('/', (req, res) => {
    
})

module.exports = router;