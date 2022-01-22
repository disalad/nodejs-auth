const router = require('express').Router();
const passport = require('passport');
const { notAuthed, authed } = require('../middleware/checkAuth');

router.get('/', notAuthed, (req, res) => {
    res.redirect('/auth/login');
});

router.get('/login', notAuthed, (req, res) => {
    res.render('login');
});

router.get('/signup', notAuthed, (req, res) => {
    res.render('signup');
});

router.get('/logout', authed, (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get(
    '/google',
    notAuthed,
    passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ],
    })
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/');
});

module.exports = router;
