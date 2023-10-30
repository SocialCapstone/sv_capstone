// routes/boardRoutes.js

const express = require('express');
const router = express.Router({ mergeParams: true });
const boardController = require('../controller/boardController');


router.get('/', boardController.index);
router.get('/new', boardController.new);
router.get('/show', boardController.show);

module.exports = router;
