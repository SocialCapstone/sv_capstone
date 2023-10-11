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

app.use(methodOverride('_method'));
app.use(express.static("public"));


const homeRouter = require('./routes/home');

app.use('/', homeRouter);

app.get('/login', (req, res) => {
    res.render('user/login');
})

app.get('/register', (req, res) => {
    res.render('user/register');
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})

