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
    },

    // 게시글 작성 요청 
    create: (req, res, next) => {

        if (res.locals.loggedIn) {
            const newBoard = new Board(req.body, res.locals.currentUser);
            const { isAnonymous } = req.body;
            if (isAnonymous === "true") {
                newBoard.author = "익명";
            }
            let img;

            const { user_id, author, title, content, date, count } = newBoard;

            if (req.file) {
                img = `/image/board/${req.file.filename}`;
            }
            else {
                img = null;
            }

            const data = [user_id, author, title, content, img, date, count];
            Board.create(data)
                .then(id => {
                    if (id) {
                        res.redirect(`/board/${id}`);
                    }
                    else {
                        res.redirect('/');
                    }
                });

        }
        else{
            res.send('로그인을 하시고 글을 쓸 수 있습니다.');
        }
    },

    show: (req, res) => {

        const id = parseInt(req.params.id);
        Board.findById(id)
            .then(board => {
                console.log(board[0]);
                res.render('board/show', { board: board[0] });
            })
            .catch(err => {
                console.log(err);
                res.redirect('/');
            })
    }

}