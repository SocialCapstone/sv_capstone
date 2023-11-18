// controller/profileController.js

const { Board } = require('../models/board');
const { Question } = require('../models/qna');
const User = require('../models/user');
const ExpressError = require('../utils/ExpressError');


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

    // 프로필 화면
    index: async (req, res, next) => {

        res.locals.profile = true;
        const id = res.locals.currentUser ? res.locals.currentUser.user_id : null;
        if (res.locals.loggedIn && id) {
            const user = await User.findById(id);
            res.render('user/profile', { user: user[0] });
        }
        else if (id === null) {
            next(new ExpressError('잘못된 접근입니다.', 500));
        }
    },

    // 계정 삭제 
    delete: async (req, res, next) => {
        const id = res.locals.currentUser ? res.locals.currentUser.user_id : null;
        if (res.locals.loggedIn && id) {
            User.deleteUserById(id)
                .then(result => {
                    if (result) {
                        req.flash('success', '계정이 삭제되었습니다.');
                        req.logout(function (err) {
                            if (err) { return next(new ExpressError('계정 삭제 오류 발생', 500)); }
                            res.redirect('/');
                        });
                    }
                    else {
                        next(new ExpressError('계정 삭제 오류 발생', 500));
                    }
                })
        }
        else {
            next(new ExpressError('잘못된 접근입니다. 권한이 없습니다.', 500));
        }
    },

    // ajax 요청 API(사용자 게시글)
    indexBoard: async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const id = parseInt(res.locals.currentUser.user_id);
        const postPerPage = 5;
        const displayPageNum = 5;

        const totalPosts = await Board.countAllByUserID(id);

        const totalPages = getTotalPages(totalPosts[0].total, postPerPage);
        const startPage = getStartPage(page, displayPageNum);
        const endPage = getEndPage(page, displayPageNum, totalPages);

        const prev = hasPrev(startPage);
        const next = hasNext(endPage, totalPages);

        const offset = (page - 1) * postPerPage;
        const data = [id, offset, postPerPage];

        const indexPosts = await Board.findByUserId(data);

        console.log(totalPosts[0]);
        res.json({ indexPosts, prev, next, startPage, endPage,  page, totalPosts: totalPosts[0].total});
    },

    indexQuestion: async (req, res) => {

        const page = parseInt(req.query.page) || 1;
        const id = parseInt(res.locals.currentUser.user_id);
        const postPerPage = 5;
        const displayPageNum = 5;

        const totalPosts = await Question.countAllByUserID(id);

        const totalPages = getTotalPages(totalPosts[0].total, postPerPage);
        const startPage = getStartPage(page, displayPageNum);
        const endPage = getEndPage(page, displayPageNum, totalPages);

        const prev = hasPrev(startPage);
        const next = hasNext(endPage, totalPages);

        const offset = (page - 1) * postPerPage;
        const data = [id, offset, postPerPage];

        const indexPosts = await Question.findByUserId(data);

        console.log(totalPosts[0]);
        res.json({ indexPosts, prev, next, startPage, endPage, page ,totalPosts: totalPosts[0].total});
    }



}