// controller/userController.js

const User = require('../models/user');


module.exports = {
    // 로그인, 회원가입 페이지 이동 
    signIn: (req, res) => {
        res.render('user/login')
    },

    signUp: (req, res) => {
        res.render('user/register');
    },

    // 로그인 포스트 요청 
    postLogin: async (req, res) => {
        User.login(req.body, (err, result) => {
            if (err !== null) {
                res.send('something went wrong')
            }
            else {
                if (result) {
                    console.log(result);
                    res.send('login success');
                }
                else {
                    res.send('login failed');
                }
            }
        })
    },

    postRegister: async (req, res) => {
        User.register(req.body, (err, result) => {
            if (err !== null) {
                res.send('something went wrong');
            }
            else {
                res.send('register success');
            }

        })
    }
}

