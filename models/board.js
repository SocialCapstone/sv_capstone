// models/board.js

const mysql = require('../config/mysql');

let board = function (user) {
    this.email = user.email;
    this.password = user.password;
    this.nickname = user.nickname;
}

board.create = function() {
    const sql = `INSERT INTO board(board_id, content, ) `
    mysql.query()
}

module.exports = board;