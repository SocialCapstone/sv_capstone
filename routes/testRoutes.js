
// routes/testRoutes.js
// 테스트 라우트(대화연습)

const express = require('express');
const router = express.Router({ mergeParams: true });
const testController = require('../controller/testController');

router.get('/',testController.basic);
router.get('/start', testController.basicStart);
router.get('/middle', testController.middle);
router.get('/middle/start', testController.middleStart);
router.get('/advanced', testController.advanced);
router.get('/advanced/start', testController.advancedStart);



module.exports = router;