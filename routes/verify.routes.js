const router = require('express').Router();
const VeifyController = require('../controllers/VerifyController');
const { authed } = require('../middleware/checkAuth');

router.get('/', authed, VeifyController.verify_page);

router.get('/:id', authed, VeifyController.verify_user);

module.exports = router;
