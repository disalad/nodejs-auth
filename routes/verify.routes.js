const router = require('express').Router();
const VeifyController = require('../controllers/VerifyController');
const { authed, notVerified } = require('../middleware/checkAuth');

router.get('/', authed, notVerified, VeifyController.verify_page);

router.get('/:token', authed, notVerified, VeifyController.verify_user);

module.exports = router;
