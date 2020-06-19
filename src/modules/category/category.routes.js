const express = require('express');
const CategoryController =  require('./category.controller');

const router = express.Router();

router.get('/', CategoryController.get);


module.exports = router;