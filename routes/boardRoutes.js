// routes/boardRoutes.js

const express = require('express');
const router = express.Router({ mergeParams: true });
const boardController = require('../controller/boardController');

const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

router.get('/', boardController.index);
router.get('/new', boardController.new);
router.get('/:id', boardController.show);
router.get('/:id/edit', boardController.edit);
router.post('/', upload.single("img"), boardController.create);
router.put('/:id/update',upload.single("img"), boardController.update);
router.delete('/:id/delete',boardController.delete);

router.post('/:id/comment', boardController.createComment);
router.put('/:id/comment/:comment_id', boardController.update);


module.exports = router;
