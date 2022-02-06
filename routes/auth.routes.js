const router = require('express').Router();
const passport = require('passport');
const { notAuthed, authed } = require('../middleware/checkAuth');
const AuthController = require('../controllers/AuthController');
const csrf = require('csurf');

const csrfProtection = csrf({
    cookie: {
        path: '/',
        httpOnly: true, // if you want you can use true here
        signed: false,
    },
});

router.get('/', notAuthed, (req, res) => {
    res.redirect('/auth/login');
});

router.get('/login', notAuthed, csrfProtection, (req, res) => {
    res.render('login', { user: req.user, csrfToken: req.csrfToken() });
});

router.post(
    '/login',
    notAuthed,
    csrfProtection,
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true,
    }),
);

router.get('/signup', notAuthed, csrfProtection, (req, res) => {
    res.render('signup', { user: req.user, csrfToken: req.csrfToken() });
});

router.post(
    '/signup',
    notAuthed,
    csrfProtection,
    AuthController.register_user,
    passport.authenticate('local', {
        successRedirect: '/verify',
        failureRedirect: '/auth/signup',
        failureFlash: true,
    }),
);

router.get('/logout', authed, (req, res) => {
    req.logout();
    res.redirect('/auth/login');
});

router.get(
    '/google',
    notAuthed,
    passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ],
    }),
);

router.get('/delete', authed, AuthController.delete_acc, (req, res) => {
    res.redirect('/auth/login');
});

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile/choose-username');
});

module.exports = router;
