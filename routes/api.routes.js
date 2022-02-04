const router = require('express').Router();
const ApiController = require('../controllers/ApiController');

router.post('/check_username', ApiController.check_username);

router.get('/users', ApiController.users);

module.exports = router;
