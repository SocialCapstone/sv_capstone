// sv_capstone/index.js(메인 어플리케이션)

const express = require('express');
const app = express();
const path = require('path');
const port = 3000 || process.env.WEB_PORT;
const methodOverride = require('method-override');
const layouts = require('express-ejs-layouts');
const mysql = require('mysql2');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const connectFlash = require('connect-flash');


require('dotenv').config()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(layouts);

// body-parser의 추가
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(methodOverride('_method'));
app.use(express.static("public"));


const homeRouter = require('./routes/homeRoutes');
const loginRouter = require('./routes/loginRoutes');
const registerRouter = require('./routes/registerRoutes');
const userController = require('./controller/userController');

app.use('/', homeRouter);


// ** 로그인 회원가입 라우트 ** 
app.use('/login', loginRouter);
app.use('/register', registerRouter);


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})

