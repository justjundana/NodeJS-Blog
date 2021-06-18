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
    connection.query(
        'SELECT * FROM articles',
        (error, results) => {
            res.render('index.ejs', { articles: results });
        }
    );
});

app.get('/:id', (req, res) => {
    const id = req.params.id;
    connection.query(
        'SELECT * FROM articles WHERE id = ?',
        [id],
        (error, results) => {
            res.render('article.ejs', { article: results[0] });
        }
    );
});

app.listen(3000);
