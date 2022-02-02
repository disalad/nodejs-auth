const router = require('express').Router();
const { authed, verified } = require('../middleware/checkAuth');
const ProfileController = require('../controllers/ProfileController');

router.get('/', authed, verified, (req, res) => {
    // res.render('profile', { user: req.user, guestProfile: null });
    res.redirect(`/profile/${req.user.username}`);
});

router.get('/edit', authed, verified, (req, res) => {
    res.render('editProfile', { user: req.user });
});

router.post('/edit', authed, verified, ProfileController.update_profile);

router.get('/choose-username', authed, verified, (req, res, next) => {
    if (req.user.googleId && !req.user.username) {
        req.user.username = null;
        res.render('chooseUsername.ejs', { user: req.user });
    } else {
        next();
    }
});

router.post('/choose-username', authed, verified, ProfileController.choose_username);

router.get('/:username', ProfileController.view_profile);

module.exports = router;
