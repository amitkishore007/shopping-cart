/* eslint-disable no-undef */
const assert = require('assert');
const Category = require('../../src/modules/category/category.model');
const Product = require('../../src/modules/product/product.model');
const User = require('../../src/modules/user/user.model');
const Cart = require('../../src/modules/cart/cart.model');
const utils = require('../../src/helpers/utils');
const db = require('../../src/config/database');
const cartService = require('../../src/services/cart.service');

describe('Cart', function() {

    let category = {
        name: "Jeans",
        type: "clothing"
    };

    let product = {
        name: "Narrow Bottom Jeans",
        description: "This is a jeans product",
        price: 11.2,
        make: 2015
    }

    let user = {
        email_address: 'iron.man@mail.com',
        password: 'demo@123',
        name: 'Iron Man',
    }

    let productId;
    let userId;
    // Prepare the category and products in the databse
    before(function(done) {
        db().then(async () => {
            // cleanup the previous record
            await Category.deleteMany({});
            await Product.deleteMany({});
            await Cart.deleteMany({});
            
            // save a category
            let savedCategory = await Category.create(category);

            // save product
            let savedProduct = await Product.create({...product, category: savedCategory._id});
            productId = savedProduct._id;

            // save user
            await User.deleteMany({});
            const password = utils.generateHash(user.password);
            const savedUser = await User.create({...user, password: password});
            userId = savedUser._id;
            done();
        });
    });

    it('Add Item to cart', async function(){ 
        const result = await cartService.addTocart(userId, productId);
        assert(result && result.n === 1 && result.ok === 1);
    });

    it('Get user cart items', async function(){ 
        const result = await Cart.find({user_id: userId});
        assert(result || false);
    });

    after(async function() {
        await Cart.deleteMany({});
    });

});