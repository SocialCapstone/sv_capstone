// models/User.js

const mysql = require('../config/mysql');
const bcrypt = require('bcrypt');

const hashPassword = async (user) => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(user.password, salt);
    return hash;
}

const login = async (pw, hashedPw) => {
    try {
        const result = await bcrypt.compare(pw, hashedPw);
        return result;
    }
    catch {
        return 'error!';
    }

}


let User = function (user) {
    this.email = user.email;
    this.password = user.password;
    this.nickname = user.nickname;
}


// register: 사용자 등록(회원가입) 
User.register = async function (body, callBack) {
    const newUser = new User(body);
    newUser.password = await hashPassword(newUser);
    const { email, password, nickname } = newUser;

    mysql.query('INSERT INTO user(email,password,nickname) VALUES (?,?,?)', [email, password, nickname], (err, res) => {
        if (err) {
            console.log('Something went wrong');
            callBack(err, null);
        }
        else {
            console.log('User Registered:');
            callBack(null, res);

        }
    })
}

// login: 사용자 로그인(로그인)
User.login = async function (body, callBack) {
    const { email, password } = body;
    mysql.query('SELECT * FROM user WHERE email=?', email, (err, res) => {
        if (err) {
            console.log('Something went wrong');
            callBack(err, null);
        }
        else {
            const hashedPassword = res[0].password;
            const isLoggedin = login(password, hashedPassword);
            isLoggedin.then(isCorrect => {
               callBack(null, isCorrect);
            })
        }
    })


}

module.exports = User;