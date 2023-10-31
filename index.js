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


require('dotenv').config()



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(layouts);
// body-parser의 추가
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// passport & cookieParser
app.use(session(sessionConfig));
app.use(flash());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());



app.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
})

app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public/'));


const homeRouter = require('./routes/homeRoutes');
const loginRouter = require('./routes/loginRoutes');
const registerRouter = require('./routes/registerRoutes');
const boardRouter = require('./routes/boardRoutes');
const testRouter = require('./routes/testRoutes');

app.use('/', homeRouter);
app.get('/error', (req, res) => {
    res.send("error!");
})

// ** 로그인 회원가입 라우트 ** 
app.use('/login', loginRouter);
app.use('/register', registerRouter);

// ** 자유게시판 라우트 ** 
app.use('/board', boardRouter);

// ** 대화연습 라우트
app.use('/test', testRouter);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})

