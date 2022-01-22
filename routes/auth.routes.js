const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res) => {
    res.redirect('/auth/login');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/logout', (req, res) => {
    res.send('Logging out');
});

router.get(
    '/google',
    passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ],
    })
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.json('Signed in using google');
});

module.exports = router;
