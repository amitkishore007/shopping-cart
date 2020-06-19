const Cart = require('./cart.model');
const common = require('../../helpers/utils');
const cartService = require('../../services/cart.service');

/**
 * Get User 
 * 
 * @param {*} req 
 * @param {*} res 
 */
const get = async (req, res) => {

    const user_id = req.user_id;

    const result = await Cart.findOne({
        user_id: user_id
    });

    return common.createSuccessResponse(req, res, result);
}

/**
 * Create New user
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const create = async (req, res) => {
    try {
        // validate product as product id
        const {
            product,
            quantity
        } = req.body;

        const user_id = req.user_id;

        await cartService.addTocart(user_id, product, quantity);

        return common.createSuccessResponse(req, res, {});

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    get,
    create
}