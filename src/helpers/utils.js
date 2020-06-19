const messages = require('../config/messages');
const bcrypt = require('bcrypt');
const crypto = require("crypto");


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} data 
 * @param {*} code 
 * @param {*} addOn 
 */
const createSuccessResponse = async (req, res, data, code = messages.CODES.SUCCESS, addOn) => {
  try {
    let response = {
      status: messages.SUCCESS,
      code: code,
      data
    };

    if (addOn) {
      response = {
        ...response,
        ...addOn
      }
    }

    return res.status(code).send(response);
  } catch (err) {
    console.log(err);
  }
}

/**
 * Method to send error response
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} error 
 */
const sendErrorResponse = (req, res, error) => {
  return res.status(error.code || 500).json({
    status: messages.FAILED,
    ...error
  });
}

/**
 * Method to remove extra digit after decimal
 * 
 * @param {*} value 
 * @param {*} decimal 
 */
const toFixed = (value, decimal = 2) => {
  let multiplier = Math.pow(10, decimal);
  return parseInt((value * multiplier).toString()) / multiplier;
}

/**
 * Method to retrieve login credentials from auth token
 * 
 * @param {*} basic_auth 
 */
const getAuthCredentials = (basic_auth) => {
  try {
    const base64Credentials = basic_auth.split(' ')[1];
    // eslint-disable-next-line no-undef
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const credArray = credentials.split(':');
    return credArray;
  } catch (err) {
    return false;
  }
}

/**
 * 
 * @param {*} str 
 */
const isJson = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
}

/**
 * 
 * @param {*} val 
 * @param {*} hash 
 */
const compareHash = (val, hash) => {
  // eslint-disable-next-line no-useless-catch
  try {
    hash = isJson(hash);
    if (Array.isArray(hash)) {
      hash = hash.pop();
    }
    return bcrypt.compareSync(val, hash);
  } catch (err) {
    throw err;
  }
}

/**
 * 
 * @param {*} givenPassword 
 * @param {*} savedPassword 
 */
const isPasswordValid = (givenPassword, savedPassword) => {
  const isMatch = compareHash(givenPassword, savedPassword);
  return isMatch;
}

/**
 * 
 * @param {*} user_id 
 */
const generateAccessToken = (user_id) => {
  const token = `${crypto.randomBytes(32).toString('hex')}${user_id}`;
  return token;
}

/**
 * 
 * @param {*} val 
 */
const generateHash = (val) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return bcrypt.hashSync(val, 10);
  } catch (err) {
    throw err;
  }
}

/**
 * 
 * @param {*} type 
 * @param {*} message 
 * @param {*} parameter 
 * @param {*} code 
 */
const generateErrorObject = (type = message.TYPES.BAD_REQUEST, message, parameter, code = messages.CODES.BAD_REQUEST) => {
  let errorObject = {
    errors: [{}]
  };
  if (code) errorObject.code = code;
  if (type) errorObject.errors[0].type = type;
  if (message) errorObject.errors[0].message = message;
  if (parameter) errorObject.errors[0].parameter = parameter;

  return errorObject;
}

/**
 * 
 * @param {*} type 
 * @param {*} message 
 * @param {*} parameter 
 * @param {*} code 
 */
const generateError = (type = message.TYPES.BAD_REQUEST, message, parameter) => {
  let errorObject = {};
  if (type) errorObject.type = type;
  if (message) errorObject.message = message;
  if (parameter) errorObject.parameter = parameter;

  return errorObject;
}

module.exports = {
  createSuccessResponse,
  toFixed,
  getAuthCredentials,
  isPasswordValid,
  generateAccessToken,
  generateErrorObject,
  sendErrorResponse,
  generateHash,
  generateError
}