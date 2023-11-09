// routes/boardRoutes.js

const express = require('express');
const router = express.Router({ mergeParams: true });
const boardController = require('../controller/boardController');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/image/Board");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext)
    }
})

const upload = multer({ storage: storage });

router.get('/', boardController.index);
router.get('/new', boardController.new);
router.get('/show', boardController.show);
router.get('/:id',boardController.show);
router.post('/', upload.single("img"), boardController.create);

module.exports = router;
