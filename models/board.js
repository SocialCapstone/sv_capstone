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
    const sql = `SELECT * FROM board WHERE post_id=?`;
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

Board.findByPage = function (page) {

}



module.exports = Board;