const router = require('express').Router();
const { authed, verified } = require('../middleware/checkAuth');
const ProfileController = require('../controllers/ProfileController');

router.get('/', authed, verified, (req, res) => {
    res.render('profile', { user: req.user, guestProfile: null });
});

router.get('/edit', authed, verified, (req, res) => {
    res.render('editProfile', { user: req.user });
});

router.post('/edit', authed, verified, ProfileController.update_profile);

router.get('/:username', ProfileController.view_profile);

module.exports = router;
