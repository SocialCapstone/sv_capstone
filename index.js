// sv_capstone/index.js(메인 어플리케이션)

const express = require('express');
const app = express();
const path = require('path');
const port = 3000 || process.env.WEB_PORT;
const methodOverride = require('method-override');
const layouts = require('express-ejs-layouts');

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


app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})

