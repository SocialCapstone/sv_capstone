// models/board.js

const mysql = require('../config/mysql');
const moment = require('moment');


require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

let Board = function (board, currentUser) {
    this.user_id = currentUser.user_id;
    this.author = currentUser.nickname;
    this.title = board.title;
    this.content = board.content;
    this.img = board.img;
    this.date = moment().format('YYYY-MM-DD');
    this.count = 0;
}

Board.create = function (data) {
    const sql = `INSERT INTO board(user_id, author, title, content, img, date, count) VALUES(?,?,?,?,?,?,?)`
    return mysql.promise().query(sql, data)
        .then(result => {
            console.log("successfully saved board");
            return result[0].insertId;
        })
}

Board.findById = function (id) {
    const sql = `SELECT post_id, author, title, content, img, date_format(date, '%Y-%m-%d') AS date, count FROM board WHERE post_id=?`;
    return mysql.promise().query(sql, [id])
        .then(rows => {
            if (rows.length > 0) {
                return rows[0];
            }
            else {
                return null;
            }
        })
}

Board.findByPage = function (data) {
    const sql = `SELECT post_id, author, title, date_format(date, '%Y-%m-%d') AS date, count FROM board LIMIT ?,?`;
    return mysql.promise().query(sql, data)
        .then(rows => {
            if (rows.length > 0) {
                return rows[0];
            }
            else {
                return null;
            }
        })
}

Board.countAll = function () {
    const sql = `SELECT COUNT(*) AS total FROM board`;
    return mysql.promise().query(sql)
        .then(rows => {
            if (rows.length > 0) {
                return rows[0];
            }
            else {
                return null;
            }
        })
}



module.exports = Board;