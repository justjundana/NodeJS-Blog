const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'git_blog'
});

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.listen(3000);
