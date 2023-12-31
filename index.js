// sv_capstone/index.js(메인 어플리케이션)

const express = require('express');
const app = express();
const path = require('path');
const port = 3000 || process.env.WEB_PORT;
const methodOverride = require('method-override');
const layouts = require('express-ejs-layouts');
const passport = require('./config/passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const sessionConfig = require('./config/sessionConfig');
const ExpressError = require('./utils/ExpressError');

require('dotenv').config()


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(layouts);

// body-parser의 추가
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// passport & cookieParser
app.use(session(sessionConfig));
app.use(flash());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    res.locals.introduce = false;
    res.locals.profile = false;
    res.locals.test = false;
    next();
})


app.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}))
app.use(express.static(__dirname + '/public/'));


const homeRouter = require('./routes/homeRoutes');
const loginRouter = require('./routes/loginRoutes');
const registerRouter = require('./routes/registerRoutes');
const boardRouter = require('./routes/boardRoutes');
const testRouter = require('./routes/testRoutes');
const qnaRouter = require('./routes/qnaRoutes');
const profileRouter = require('./routes/profileRoutes');
const referenceRouter = require('./routes/referenceRoutes');
const userController = require('./controller/userController');


// 모델 추가 
app.use('/', homeRouter);
app.get('/error', (req, res) => {
    res.send("error!");
})

// ** 로그인 회원가입 라우트 및 로그아웃 get 요청 ** 
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.get('/logout', userController.signOut);

// ** 자유게시판 라우트 ** 
app.use('/board', boardRouter);
app.use('/qna', qnaRouter);
// ** 대화연습 라우트
app.use('/test', testRouter);
// ** 프로필 라우트 **
app.use('/profile', profileRouter);
// ** 자료실 라우트 ** 
app.use('/reference', referenceRouter);


app.get('/introduce', (req, res) => {
    res.locals.introduce = true;
    res.render('introduce');
})

app.get('/welfare', (req, res) => {
    res.render('welfare');
})

app.get('/self', (req, res) => {
    res.render('self');
})


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not found 404', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "SOMETHING WENT WRONG!" } = err;
    res.status(statusCode).render('error', { err, statusCode });
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})

