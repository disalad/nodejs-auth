const router = require('express').Router();

router.get('/', (req, res) => {
    res.redirect('/a/login');
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

router.get('/google', (req, res) => {
    res.send('Login with google');
});

module.exports = router;
