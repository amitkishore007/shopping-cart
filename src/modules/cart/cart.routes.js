const express = require('express');
const CartController =  require('./cart.controller');
const { check } = require('express-validator');
const validation = require('../../moddlewares/validation');

const router = express.Router();

router.post('/', [ 
    check('product').isString(),
    check('quantity').optional({ checkFalsy:true }).isInt().toInt(),
 ], validation.validate, CartController.create);
 
router.get('/', CartController.get);


module.exports = router;