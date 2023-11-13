// utils/ErrorHandle.js

const httpStatus = require('http-status-codes');

exports.pageNotFoundError = (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.render('error');
}

exports.internalServerError = (error, req, res, next) => {
    let errorCode = httpStatus.INTERNER_SERVER_ERROR;
    res.status(errorCode);
    res.render('error',);
}