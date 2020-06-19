const mongoose = require('mongoose');
const messages = require('../../config/messages');
const modelNames = require('../../config/model-names');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, messages.required('Product Name')],
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, messages.required('Category')],
    ref: 'category'
  },
  description: {
    type: String,
    required: [true, messages.required('Product Description')],
    trim: true
  },
  price: {
    type: String,
    required: [true, messages.required('Price')],
    trim: true
  },
  make: {
    type: Number,
    required: [true, messages.required('Manufacturing Date')],
    trim: true
  }
}, 
{
  timestamps: true
});

ProductSchema.methods = {
  toJSON() {
    return {
      id: this._id,
      name: this.name,
      category: this.category,
      description: this.description,
      price: this.price,
      make: this.make
    };
  }
};

module.exports = mongoose.model(modelNames.PRODUCT, ProductSchema);