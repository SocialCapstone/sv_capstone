// models/User.js

const mysql = require('../config/mysql');


let User = function (user) {
    this.email = user.email;
    this.password = user.password;
    this.nickname = user.nickname;
}

User.findByEmail = function (email) {
    const sql = `SELECT * FROM user_info WHERE email =?`;
    return mysql.promise().query(sql, [email])
        .then(rows => {
            if (rows.length > 0) {
                return rows[0];
            }
            else {
                return null;
            }
        })
}

User.findById = function (id) {
    const sql = `SELECT * FROM user_info WHERE user_id=?`;
    return mysql.promise().query(sql, id)
        .then(rows => {
            if (rows.length > 0) {
                return rows[0];
            }
            else {
                return null;
            }
        })
}


User.createUser = function (email, hashedPassword, nickname) {
    const sql = `INSERT INTO user_info(email, password,nickname) VALUES (?,?,?)`;
    return mysql.promise().query(sql, [email, hashedPassword, nickname])
        .then(result => {
            return result[0].insertId;
        })
}

User.findUserIdByID = function (id) {
    const sql = `SELECT user_id from user_info WHERE user_id=?`;
    return mysql.promise().query(sql, id)
        .then(result => {
            if (result.length > 0) {
                return result[0];
            }
            else {
                return null;
            }
        });

}

User.deleteUserById = function (id) {
    const sql = `DELETE FROM user_info WHERE user_id = ? `;
    return mysql.promise().query(sql, id)
        .then(result => {
            if (result.length > 0) {
                return result[0];
            }
            else {
                return null;
            }
        });
}




module.exports = User;