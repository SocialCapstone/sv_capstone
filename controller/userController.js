// controller/userController.js
const User = require('../models/user');
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
    // 로그인, 회원가입 페이지 이동 
    signIn: (req, res) => {
        res.render('user/login')
    },

    signUp: (req, res) => {
        res.render('user/register');
    },
    signOut: (req, res, next) => {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    },

    
}

