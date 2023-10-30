// controller/boardController.js

// controller/boardController.js

const Board = require('../models/board');

module.exports = {
    // 게시판 목록
    index: (req, res) => {
        res.render('board/index');
    },
    // 단일 게시글 확인   
    show: (req, res) => {
        res.render('board/show');
    },

    // 게시글 작성 페이지 
    new: (req, res) => {
        res.render('board/new');
    }

}