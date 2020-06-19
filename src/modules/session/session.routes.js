const express = require('express');
const SessionController =  require('./session.controller');

const router = express.Router();

router.post('/', SessionController.login);


module.exports = router;