// controller/boardController.js

// controller/boardController.js

const Board = require('../models/board');

// ** 게시판 페이징 알고리즘 함수 **
const hasPrev = (startPage) => {
    return (startPage == 1) ? false : true;
}

const hasNext = (endPage, totalPages) => {
    return (endPage == totalPages) ? false : true;
}

const getTotalPages = (totalPost, postPerPage) => {
    return parseInt((totalPost - 1) / postPerPage) + 1;
}

const getStartPage = (currentPage, displayPageNum) => {
    return parseInt((currentPage - 1) / displayPageNum) * displayPageNum + 1;
}

const getEndPage = (currentPage, displayPageNum, totalPages) => {
    let endPage = (parseInt((currentPage - 1) / displayPageNum) + 1) * displayPageNum;

    if (totalPages < endPage) endPage = totalPages;
    return endPage;
}


module.exports = {

    // 게시판 목록
    index: async (req, res) => {

        const page = parseInt(req.query.page) || 1;
        const postPerPage = 10;
        const displayPageNum = 10;
        const totalPosts = await Board.countAll();

        const totalPages = getTotalPages(totalPosts[0].total, postPerPage);
        const startPage = getStartPage(page, displayPageNum);
        const endPage = getEndPage(page, displayPageNum, totalPages);

        const prev = hasPrev(startPage);
        const next = hasNext(endPage, totalPages);

        const offset = (page - 1) * postPerPage;
        const data = [offset, postPerPage];

        const indexPosts = await Board.findByPage(data);
        res.render('board/index', { indexPosts, prev, next, startPage, endPage, currentPage: page });
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
        else {
            res.send('로그인을 하시고 글을 쓸 수 있습니다.');
        }
    },

    
    show: async (req, res) => {

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