const router = require('express').Router();
const { notAuthed, authed } = require('../middleware/checkAuth');

router.get('/', authed, (req, res) => {
    res.render('profile', { user: req.user });
});

module.exports = router;
