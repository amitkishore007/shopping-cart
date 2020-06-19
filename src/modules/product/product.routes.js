const express = require('express');
const ProductController =  require('./product.controller');

const router = express.Router();

router.get('/', ProductController.get);


module.exports = router;