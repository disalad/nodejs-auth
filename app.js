const express = require('express');
const app = express();
const AuthRouter = require('./routes/auth.routes');
const ProfileRouter = require('./routes/profile.routes');
const mongoose = require('mongoose');
const {
    mongodb: { dbUri },
    session: { cookieKey },
} = require('./config/keys');
const passportSetup = require('./config/passport.setup');
const cookieSession = require('cookie-session');
const passport = require('passport');
const path = require('path');
const flash = require('express-flash');
const fileUpload = require('express-fileupload');

// DB connect
mongoose.connect(dbUri, () => {
    console.log('Connected to mongodb');
});

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [cookieKey],
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());
app.use(flash());

// Set up view engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res, next) => {
    res.render('home', { user: req.user });
});

// Static Files
app.use('/css', express.static(path.join(__dirname, 'public/styles')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// {a} stands for auth
app.use('/auth', AuthRouter);
app.use('/profile', ProfileRouter);

// Server
app.listen(3000, () => {
    console.log('Express app listening on port 3000');
});
