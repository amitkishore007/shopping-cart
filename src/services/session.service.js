const Session = require('../modules/session/session.model');
const utils = require('../helpers/utils');

/**
 * 
 * @param {*} userData 
 */
const saveSession = async (userData) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const userId = userData.id;
        // Delete previous session before create new session
        await Session.deleteMany({
            user_id: userId
        });

        // Create session
        const accessToken = utils.generateAccessToken(userId);
        const session_data = {
            user_id: userId,
            token: accessToken
        }

        let sessionData = await Session.create(session_data);
        const session = sessionData.toJSON();
        // Cache session in redis

        const result = {
            token: accessToken,
            user: userData,
            updated_at: session.updated_at
        };

        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    saveSession
}