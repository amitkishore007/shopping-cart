const utils = require('../helpers/utils');
const messages = require('../config/messages');
const {
    validationResult
} = require('express-validator');


/**
 * Method for validating and returning and query param
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const {
        RESPONSE,
        TYPES,
        CODES
    } = messages;
    const errs = errors.array();
    const validationErrors = [];
    errs.forEach((error) => {
        validationErrors.push({
            ...utils.generateError(TYPES.BAD_REQUEST, RESPONSE.FIELD_INVALID.message, error.param, CODES.BAD_REQUEST)
        });
    })

    return res.status(CODES.BAD_REQUEST).json({
        code: CODES.BAD_REQUEST,
        type: messages.FAILED,
        errors: validationErrors
    });
}

module.exports = {
    validate
}