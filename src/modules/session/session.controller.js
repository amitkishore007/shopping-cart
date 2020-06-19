const utils = require('../../helpers/utils');
const User = require('../user/user.model');
const messages = require('../../config/messages');
const sessionService = require('../../services/session.service');

/**
 * User Login
 * 
 * @param {*} req 
 * @param {*} res 
 */
const login = async (req, res) => {

    try {
        const basicAuth = req.headers.authorization;

        const authCredentials = utils.getAuthCredentials(basicAuth);

        const {
            RESPONSE,
            TYPES,
            CODES
        } = messages;

        if (!authCredentials) {
            const errorObject = utils.generateErrorObject(TYPES.AUTHORIZATION_REQUIRED, RESPONSE.AUTHORIZATION_REQUIRED.message, null, CODES.AUTHORIZATION_REQUIRED);
            return utils.sendErrorResponse(req, res, errorObject);
        }

        const [id, password] = authCredentials;

        let userData = await User.findOne({
            email_address: id
        });

        // Check for employee code
        if (!userData) {
            const errorObject = utils.generateErrorObject(TYPES.SESSION_LOADING_FAILED, RESPONSE.SESSION_LOADING_FAILED.message, null, CODES.SESSION_LOADING_FAILED);
            return utils.sendErrorResponse(req, res, errorObject);
        }

        const isPasswordValid = utils.isPasswordValid(password, userData.password);
        if (!isPasswordValid) {
            const errorObject = utils.generateErrorObject(TYPES.PERMISSIONS_DENIED, RESPONSE.PERMISSIONS_DENIED.message, null, CODES.PERMISSIONS_DENIED);
            return utils.sendErrorResponse(req, res, errorObject);
        }

        const result = await sessionService.saveSession(userData);

        return utils.createSuccessResponse(req, res, result);
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    login
}