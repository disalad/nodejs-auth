const router = require('express').Router();
const { authed } = require('../middleware/checkAuth');
const ProfileController = require('../controllers/ProfileController');

router.get('/', authed, (req, res) => {
    res.render('profile', { user: req.user });
});

router.get('/edit', authed, (req, res) => {
    res.render('editProfile', { user: req.user });
});

router.post('/edit', authed, ProfileController.update_profile);

module.exports = router;
