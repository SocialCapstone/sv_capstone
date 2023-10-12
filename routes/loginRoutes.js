// loginRoutes.js
// 로그인 라우터 

const express = require('express');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
    res.render('user/login');
})

router.post('/', (req, res) => {
    console.log(req.body);
    res.redirect('/login');
})


module.exports = router;