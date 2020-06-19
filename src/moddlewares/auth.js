const Session = require('../modules/session/session.model');
const utils = require('../helpers/utils');
const messages = require('../config/messages');

module.exports = async (req, res, next) => {

    const token = req.header('X-SESSION-ID');
    const {
        TYPES,
        RESPONSE,
        CODES
    } = messages;
    const errorObject = utils.generateErrorObject(TYPES.AUTHORIZATION_REQUIRED, RESPONSE.AUTHORIZATION_REQUIRED.message, null, CODES.AUTHORIZATION_REQUIRED);

    if (!token) {
        return utils.sendErrorResponse(req, res, errorObject);
    }

    const session = await Session.findOne({
        token: token.trim()
    });

    if (!session) {
        return utils.sendErrorResponse(req, res, errorObject);
    }

    req.user_id = session.user_id;
    req.token = session.token;
    next();
};