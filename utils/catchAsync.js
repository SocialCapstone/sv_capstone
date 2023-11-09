// utils/catchAsync.js
// 비동기 함수를 감싼다. (wrapAsync)

module.exports = func => {
    return function (req, res, next) {
        func(req, res, next).catch(e => next(e));
    }
}
