// controller/profileController.js

const { Board } = require('../models/board');
const { Question } = require('../models/qna');
const User = require('../models/user');
const ExpressError = require('../utils/ExpressError');
const bcrypt = require('bcrypt');

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

    // 비밀번호 변경 페이지 
    edit: (req, res) => {
        res.render('user/password');
    },

    // 비밀번호 변경 요청(put)
    update: async (req, res) => {
        const { password, nextPass, nextPass_confirm } = req.body;
        // 입력하지 않을시
        if (password === '' || nextPass === '' || nextPass_confirm === '') {
            req.flash('error', '입력하지 않은 내용이있습니다.');
            res.redirect('/profile/edit');
        }
        // 내용이 전부 입력되었을때 
        else {
            
            const id = parseInt(res.locals.currentUser.user_id)
            const user = await User.findById(id);

            // 현재 비밀번호와 변경하려는 비밀번호가 일치하지 않을시 
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (err) {
                    console.log(err);
                }
                if (result) {
                    // 변경하려는 비밀번호가 일치하지 않을시
                    if (nextPass !== nextPass_confirm) {
                        req.flash('error', '변경하려는 비밀번호가 일치하지 않습니다.');
                        res.redirect('/profile/edit');
                    }
                    // 변경하려는 비밀번호가 일치시 
                    else {
                        bcrypt.hash(nextPass, 10, (err, hashedPassword) => {
                            if (err) {
                                req.flash('error', '비밀번호 변경중 오류가 발생했습니다. 다시 시도해주세요');
                                res.redirect('/profile/edit');
                            }
                            else {
                            
                                const data = [hashedPassword, id];
                                
                                User.findByIdAndUpdate(data)
                                    .then(result => {
                                        if (result) {
                                            req.logout(function (err) {
                                                if (err) { return next(new ExpressError('계정 삭제 오류 발생', 500)); }
                                                req.flash('success', '비밀번호를 변경했습니다! 다시 로그인해주세요');
                                                res.redirect('/login');
                                            });
                                    
                                        }
                                        else {
                                            next(new ExpressError('비밀번호 변경중 오류가 발생했습니다. 다시 시도해주세요', 500));
                                        }
                                    });
                            }
                        })
                    }
                }
                else {
                    req.flash('error', '현재 비밀번호가 일치하지 않습니다.');
                    res.redirect('/profile/edit');
                }
            });





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
        res.json({ indexPosts, prev, next, startPage, endPage, page, totalPosts: totalPosts[0].total });
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


        res.json({ indexPosts, prev, next, startPage, endPage, page, totalPosts: totalPosts[0].total });
    }



}