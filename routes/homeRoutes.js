// homeRoutes 
// 홈페이지 라우트 

const express = require('express');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
    res.render('homePage');
})

router.post('/', (req, res) => {
    
})

module.exports = router;