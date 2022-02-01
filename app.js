const express = require('express');
const app = express();
const AuthRouter = require('./routes/auth.routes');
const ProfileRouter = require('./routes/profile.routes');
const VerifyRouter = require('./routes/verify.routes');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const path = require('path');
const flash = require('express-flash');
const fileUpload = require('express-fileupload');
const minifyHTML = require('express-minify-html');
const { anyAuthVerified } = require('./middleware/checkAuth');
require('./config/passport.setup');
require('dotenv').config();

// DB connect
mongoose.connect(process.env.MONGODB_URI, () => {
    console.log('Connected to mongodb');
});

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_SESSION_KEY],
    }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());
app.use(flash());
app.use(
    minifyHTML({
        override: true,
        exception_url: false,
        htmlMinifier: {
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true,
            minifyJS: true,
        },
    }),
);

// Set up view engine
app.set('view engine', 'ejs');

// Static Files
// eslint-disable-next-line no-undef
app.use('/css', express.static(path.join(__dirname, 'public/styles')));
// eslint-disable-next-line no-undef
app.use('/js', express.static(path.join(__dirname, 'public/js')));
// eslint-disable-next-line no-undef
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.get('/', anyAuthVerified, (req, res) => {
    res.render('home', { user: req.user });
});

app.use('/auth', AuthRouter);
app.use('/profile', ProfileRouter);
app.use('/verify', VerifyRouter);

// Server
app.listen(process.env.PORT || 3000, () => {
    console.log('Express app listening on port 3000');
});
