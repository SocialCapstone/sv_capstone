// routes/profileRoutes.js

const express = require('express');
const router = express.Router({ mergeParams: true });
const profileController = require('../controller/profileController');

router.get('/', profileController.index);
router.get('/board', profileController.indexBoard);
router.get('/qna',profileController.indexQuestion);
router.delete('/', profileController.delete);



module.exports = router;