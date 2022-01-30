const router = require('express').Router();
const { notAuthed, authed } = require('../middleware/checkAuth');

router.get('/', authed, (req, res) => {
    res.render('profile', { user: req.user });
});

router.get('/edit', authed, (req, res, next) => {
    res.render('editProfile', { user: req.user });
});

module.exports = router;
