const { anyAuthVerified, authedWithUsername } = require('../middleware/checkAuth');
const router = require('express').Router();
const HomeController = require('../controllers/HomeController');

router.get('/', anyAuthVerified, authedWithUsername, HomeController.home_page);

module.exports = router;
