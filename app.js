const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'git_blog'
});

app.use(
    session({
        secret: 'ɹ1ʎ5ɐ4ꓭןⱯ4u4ꓷunſ',
        resave: false,
        saveUninitialized: false,
    })
);

app.use((req, res, next) => {
    if (req.session.userId === undefined) {
        res.locals.isLoggedIn = false;
    } else {
        res.locals.email = req.session.email;
        res.locals.isLoggedIn = true;
    }
    next();
});

app.get('/signin', (req, res) => {
    res.render('signin.ejs');
});

app.post('/signin', (req, res) => {
    const email = req.body.email;

    connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (error, results) => {
            if (results.length > 0) {
                const plain = req.body.password;
                const hash = results[0].password;
                bcrypt.compare(plain, hash, (error, isEqual) => {
                    if (isEqual) {
                        req.session.userId = results[0].id;
                        req.session.email = results[0].email;
                        res.redirect('/');
                    } else {
                        res.redirect('/signin');
                    }
                });
            } else {
                console.log(error);
                res.redirect('/signin');
            }
        }
    )
});

app.get('/signup', (req, res) => {
    res.render('signup.ejs');
});

app.post('/signup',
    (req, res, next) => {
        console.log('Empty input value check');
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const errors = [];

        if (name === '') {
            errors.push('Name is empty');
        }

        if (email === '') {
            errors.push('Email is empty');
        }

        if (password === '') {
            errors.push('Password is empty');
        }

        if (errors.length > 0) {
            res.render('signup.ejs', { errors: errors });
        } else {
            next();
        }
    },
    (req, res, next) => {
        console.log('Duplicate emails check');
        const email = req.body.email;
        const errors = [];
        connection.query(
            'SELECT * FROM users WHERE email = ?',
            [email],
            (error, results) => {
                if (results.length > 0) {
                    errors.push('Failed to register user');
                    res.render('signup.ejs', { errors: errors });
                } else {
                    next();
                }
            }
        );
    },
    (req, res) => {
        console.log('Sign up');
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        bcrypt.hash(password, 10, (error, hash) => {
            connection.query(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                [name, email, hash],
                (error, results) => {
                    req.session.userId = results.insertId;
                    req.session.email = email;
                    res.redirect('/');
                }
            );
        });
    }
);

app.get('/signout', (req, res) => {
    req.session.destroy(error => {
        res.redirect('/');
    });
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

app.get('/create', (req, res) => {
    res.render('create.ejs');
});

app.post('/create', (req, res) => {
    connection.query(
        'INSERT INTO articles (title, content) VALUES (?, ?)',
        [req.body.title, req.body.content],
        (error, results) => {
            res.redirect('/');
        }
    );
});

app.get('/edit/:id', (req, res) => {
    connection.query(
        'SELECT * FROM articles WHERE id = ?',
        [req.params.id],
        (error, results) => {
            res.render('edit.ejs', { article: results[0] });
        }
    );
});

app.post('/update/:id', (req, res) => {
    connection.query(
        'UPDATE articles SET title = ?, content = ? WHERE id = ?',
        [req.body.title, req.body.content, req.params.id],
        (error, results) => {
            res.redirect('/');
        }
    );
});

app.get('/delete/:id', (req, res) => {
    connection.query(
        'DELETE FROM articles WHERE id = ?',
        [req.params.id],
        (error, results) => {
            res.redirect('/');
        }
    );
});

app.listen(3000);
