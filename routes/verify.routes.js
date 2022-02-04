const router = require('express').Router();
const VerifyController = require('../controllers/VerifyController');
const { authed, notVerified } = require('../middleware/checkAuth');

router.get('/', authed, notVerified, VerifyController.verify_page);

router.get('/resend', authed, notVerified, VerifyController.resend_email);

router.get('/:token', authed, notVerified, VerifyController.verify_user);

module.exports = router;
