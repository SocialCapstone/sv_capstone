// controller/referenceController.js

const Reference = require('../models/reference.js')

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
    index: async (req, res) => {

        const page = parseInt(req.query.page) || 1;
        const postPerPage = 5;
        const displayPageNum = 10;

        const totalPosts = await Reference.countAll();

        const totalPages = getTotalPages(totalPosts[0].total, postPerPage);
        const startPage = getStartPage(page, displayPageNum);
        const endPage = getEndPage(page, displayPageNum, totalPages);

        const prev = hasPrev(startPage);
        const next = hasNext(endPage, totalPages);

        const offset = (page - 1) * postPerPage;

        const data = [offset, postPerPage];
        const indexPosts = await Reference.findByPage(data);

        res.render('reference/index', { indexPosts, prev, next, startPage, endPage, currentPage: page });
    }
}