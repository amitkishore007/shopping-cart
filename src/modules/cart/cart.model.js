const mongoose = require('mongoose');
const messages = require('../../config/messages');
const modelNames = require('../../config/model-names');
const common = require('../../helpers/utils');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: [true, messages.required('User ID')],
        trim: true
    },
    quantity: {
        type: Number,
        required: [true, messages.required('Quantity')],
        default: 0
    },
    total: {
        type: Number,
        required: [true, messages.required('Total')],
        default: 0,
        set: (v) => common.toFixed(v)
    },
    products: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, messages.required('Product Id')],
        },
        name: {
            type: String,
            required: [true, messages.required('Product Name')],
        },
        price: {
            type: Number,
            required: [true, messages.required('Product Price')],
        },
        quantity: {
            type: Number,
            required: [true, messages.required('Product Quantity')]
        }
    }],
}, {
    timestamps: true
});

CartSchema.methods = {
    toJSON() {
        return {
            id: this._id,
            user: this.user_id,
            quantity: this.quantity,
            total: common.toFixed(this.total),
            products: this.products
        };
    }
};

module.exports = mongoose.model(modelNames.CART, CartSchema);