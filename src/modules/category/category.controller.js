const Category = require('./category.model');
const utils = require('../../helpers/utils');

/**
 * Return list of documents
 * 
 * @param {*} req 
 * @param {*} res 
 */
const get = async (req, res) => {

    const result = await Category.find({});

    return utils.createSuccessResponse(req, res, result);
}

module.exports = {
    get
}