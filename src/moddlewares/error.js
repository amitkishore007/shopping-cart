const messages = require('../config/messages');
const utils = require('../helpers/utils');

module.exports = (app) => {

    app.use((req, res) => {
        const errorObject = utils.generateErrorObject(messages.TYPES.BAD_REQUEST, messages.RESPONSE.RESOURCE_NOT_FOUND.message);
        return utils.sendErrorResponse(req, res, errorObject);
    });

}