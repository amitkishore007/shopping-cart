module.exports = {
  SUCCESS: 'success',
  FAILED: 'failed',
  CODES: {
    BAD_REQUEST: 400,
    RESOURCE_NOT_FOUND: 404,
    FIELD_INVALID: 400,
    FIELD_REQUIRED: 400,
    METHOD_NOT_SUPPORTED: 405,
    ACTION_FAILED: 500,
    SUCCESS: 200,
    CREATED: 201,
    AUTHORIZATION_REQUIRED: 401,
    SESSION_LOADING_FAILED: 454,
    PERMISSIONS_DENIED: 403
  },
  TYPES: {
    BAD_REQUEST: "BAD_REQUEST",
    RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND",
    FIELD_INVALID: "FIELD_INVALID",
    FIELD_REQUIRED: "FIELD_REQUIRED",
    METHOD_NOT_SUPPORTED: "METHOD_NOT_SUPPORTED",
    ACTION_FAILED: "ACTION_FAILED",
    AUTHORIZATION_REQUIRED: "AUTHORIZATION_REQUIRED",
    SESSION_LOADING_FAILED: "SESSION_LOADING_FAILED",
    PERMISSIONS_DENIED: "PERMISSIONS_DENIED"
  },
  RESPONSE: {
    ACTION_FAILED: {
      type: 'ACTION_FAILED',
      message: 'The server failed to perform this action for unknown internal reason.'
    },
    METHOD_NOT_SUPPORTED: {
      type: 'METHOD_NOT_SUPPORTED',
      message: 'HTTP method is not supported or is not allowed for the resource.'
    },
    RESOURCE_NOT_FOUND: {
      type: 'RESOURCE_NOT_FOUND',
      message: 'Resource does not exist or has been removed.'
    },
    FIELD_INVALID: {
      type: 'FIELD_INVALID',
      parameter: '',
      message: 'The value of the field is invalid'
    },
    FIELD_REQUIRED: {
      type: 'FIELD_REQUIRED',
      parameter: '',
      message: 'The value of the field is required'
    },
    SUCCESS: {
      status: 'success',
      code: 200
    },
    AUTHORIZATION_REQUIRED: {
      type: "AUTHORIZATION_REQUIRED",
      message: "Performing this action on this resource requires authorization"
    },
    SESSION_LOADING_FAILED: {
      type: "SESSION_LOADING_FAILED",
      message: "The server failed to load the session"
    },
    PERMISSIONS_DENIED: {
        type: "PERMISSIONS_DENIED",
        message: "You do not have permissions to perform this action on this resource"
    }
  },
  required: (field) => field + ' is required.',
  invalid: (field) => field + ' is invalid.'
};