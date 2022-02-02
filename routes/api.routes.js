const router = require('express').Router();
const ApiController = require('../controllers/ApiController');

router.post('/check_username', ApiController.check_username);

module.exports = router;
