// routes/referenceRoutes.js

const express = require('express');
const router = express.Router({ mergeParams: true });
const referenceController = require('../controller/referenceController');

router.get('/', referenceController.index);

module.exports = router; 