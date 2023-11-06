// config/passport.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use('local-signUp', new LocalStrategy({
    usernameField: 'email',
    passwordFiend: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {

    const { nickname } = req.body;

    User.findByEmail(email)
        .then(user => {
            if (user.length > 0) {
                console.log(user, "이미 존재");
                return done(null, false, req.flash('error', '이미 등록된 이메일입니다.'));
            }
            else {
                console.log(user, "안존재")
                bcrypt.hash(password, 10, (err, hashedPassword) => {
                    if (err) {
                        return done(err);
                    }
                    User.createUser(email, hashedPassword, nickname)
                        .then(id => {
                            console.log(id);
                            User.findById(id)
                                .then(user => {
                                    console.log(user[0]);
                                    return done(null, user[0]);
                                });
                        })
                        .catch(err => {
                            return done(err);
                        });
                })
            }
        })
        .catch(err => {
            return done(err);
        });
}));



passport.use('local-signIn', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    console.log('로그인!');
    User.findByEmail(email)
        .then(user => {
            console.log(user);
            if (user.length === 0) {
                console.log("존재하지 않는 사용자");
                return done(null, false, req.flash('error', '존재하지 않는 사용자입니다.'));
            }
            else {
                console.log(password, user[0].password);
                bcrypt.compare(password, user[0].password, (err, result) => {
                    if (err) {
                        return done(err);
                    }
                    if (result) {
                        console.log('비밀번호 일치');
                        return done(null, user[0]);
                    } else {
                        console.log('비밀번호 불일치');
                        req.flash('error',"아이디 또는 비밀번호가 일치하지 않습니다.");
                        return done(err);
                    }
                })
            }
        })

}));

module.exports = passport; 