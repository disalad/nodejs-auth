const router = require('express').Router();
const passport = require('passport');
const { notAuthed, authed } = require('../middleware/checkAuth');
const AuthController = require('../controllers/AuthController');

router.get('/', notAuthed, (req, res) => {
    res.redirect('/auth/login');
});

router.get('/login', notAuthed, (req, res) => {
    res.render('login', { user: req.user });
});

router.post(
    '/login',
    notAuthed,
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true,
    }),
);

router.get('/signup', notAuthed, (req, res) => {
    res.render('signup', { user: req.user });
});

router.post(
    '/signup',
    notAuthed,
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
