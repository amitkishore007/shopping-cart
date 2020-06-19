const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const messages = require('../../config/messages');
const modelNames = require('../../config/model-names');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, messages.required('User Name')],
    trim: true
  },
  email_address: {
    type: String,
    unique: true,
    required: [true, messages.required('Email Address')],
    trim: true
  },
  password: {
    type: String,
    required: [true, messages.required('Password')],
    trim: true
  },
}, 
{
  timestamps: true
});

UserSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!'
});

UserSchema.methods = {
  toJSON() {
    return {
      id: this._id,
      name: this.name,
      email_address: this.email_address,
    };
  }
};

module.exports = mongoose.model(modelNames.USER, UserSchema);