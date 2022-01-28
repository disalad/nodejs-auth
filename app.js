const express = require('express');
const app = express();
const AuthRouter = require('./routes/auth.routes');
const mongoose = require('mongoose');
const {
    mongodb: { dbUri },
    session: { cookieKey },
} = require('./config/keys');
const passportSetup = require('./config/passport.setup');
const cookieSession = require('cookie-session');
const passport = require('passport');
const path = require('path');

// DB connect
mongoose.connect(dbUri, () => {
    console.log('Connected to mongodb');
});

// Middleware
app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [cookieKey],
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Set up view engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res, next) => {
    res.render('home', { user: req.user });
});

app.use('/css', express.static(path.join(__dirname, 'public/styles')));

// {a} stands for auth
app.use('/auth', AuthRouter);

// Server
app.listen(3000, () => {
    console.log('Express app listening on port 3000');
});
