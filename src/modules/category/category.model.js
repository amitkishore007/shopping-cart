const mongoose = require('mongoose');
const messages = require('../../config/messages');
const modelNames = require('../../config/model-names');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, messages.required('Product Name')],
    trim: true
  },
  type: {
    type: String,
    required: [true, messages.required('Category')],
    trim: true
  }
}, 
{
  timestamps: true
});

CategorySchema.methods = {
  toJSON() {
    return {
      id: this._id,
      name: this.name,
      type: this.type
    };
  }
};

module.exports = mongoose.model(modelNames.CATEGORY, CategorySchema);