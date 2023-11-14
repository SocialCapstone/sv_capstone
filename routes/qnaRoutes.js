// routes/qnaRoutes.js

const express = require('express');
const router = express.Router({ mergeParams: true });
const qnaController = require('../controller/qnaController');

const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

router.get('/', qnaController.index);
router.get('/new', qnaController.new);
router.get('/:id', qnaController.show);
router.get('/:id/edit', qnaController.edit);
router.post('/', upload.single("img"), qnaController.create);
router.put('/:id/update',upload.single("img"), qnaController.update);
router.delete('/:id/delete',qnaController.delete);

router.post('/:id/comment', qnaController.createComment);
router.put('/:id/comment/:comment_id', qnaController.updateComment);
router.delete('/:id/comment/:comment_id', qnaController.deleteComment);

module.exports = router;