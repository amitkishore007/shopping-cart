const mongoose = require('mongoose');
const messages = require('../../config/messages');
const modelNames = require('../../config/model-names');

const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, messages.required('User id')]
  },
  token: {
    type: String,
    required: [true, messages.required('Token')],
    trim: true
  }
}, 
{
  timestamps: true
});


SessionSchema.methods = {
  toJSON() {
    return {
      id: this._id,
      user: this.user_id,
      token: this.token,
    };
  }
};

module.exports = mongoose.model(modelNames.SESSION, SessionSchema);