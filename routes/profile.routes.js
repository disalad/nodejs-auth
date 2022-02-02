const router = require('express').Router();
const {
    authed,
    verified,
    authedNoUsername,
    authedWithUsername,
} = require('../middleware/checkAuth');
const ProfileController = require('../controllers/ProfileController');

router.get('/', authed, verified, (req, res) => {
    // res.render('profile', { user: req.user, guestProfile: null });
    res.redirect(`/profile/${req.user.username}`);
});

router.get('/edit', authed, verified, authedWithUsername, (req, res) => {
    res.render('editProfile', { user: req.user });
});

router.post('/edit', authed, verified, authedWithUsername, ProfileController.update_profile);

router.get('/choose-username', authed, verified, authedNoUsername, (req, res) => {
    req.user.username = null;
    res.render('chooseUsername.ejs', { user: req.user });
});

router.post(
    '/choose-username',
    authed,
    verified,
    authedNoUsername,
    ProfileController.choose_username,
);

router.get('/:username', authedWithUsername, ProfileController.view_profile);

module.exports = router;
