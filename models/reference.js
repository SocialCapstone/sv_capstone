// models/reference.js

const mysql = require('../config/mysql');
let Reference = function () { console.log('create')};

Reference.findByPage = function (data) {
    const sql = `SELECT tag, title, agency, link, date_format(date, '%Y-%m-%d') AS date FROM reference LIMIT ?,? `;
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

Reference.countAll = function () {
    const sql = `SELECT COUNT(*) AS total FROM reference`;
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

module.exports = Reference;