const Product =  require('./product.model');
const common = require('../../helpers/utils');
const modelNames = require('../../config/model-names');
const ObjectId = require('mongoose').Types.ObjectId;
const utils = require('../../helpers/utils');
const messages = require('../../config/messages');

/**
 * Return list of products
 * 
 * @param {*} req 
 * @param {*} res 
 */
const get = async (req, res) => {

    const { category } = req.query;

    if(category && !ObjectId.isValid(category)) {
        const {
            RESPONSE,
            TYPES,
            CODES
        } = messages;

        const errorObject = utils.generateErrorObject(TYPES.BAD_REQUEST, RESPONSE.FIELD_INVALID.message, 'category', CODES.BAD_REQUEST);
        return utils.sendErrorResponse(req, res, errorObject);
    }

    const query = {};

    if(category && category.length) query.category = category;

    const result = await Product.find(query).populate(modelNames.CATEGORY);

    return common.createSuccessResponse(req, res, result);
}


module.exports = {
    get
}