const assert = require('assert');
const Product = require('../../src/modules/product/product.model');
const Category = require('../../src/modules/category/category.model');
const db = require('../../src/config/database');

describe('Product', function() {

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

    let categoryId;
    let productId;
    // Prepare the category and products in the databse
    before(function(done) {
        db().then(async () => {
            await Category.deleteMany({});
            await Product.deleteMany({});
            let savedCategory = await Category.create(category);
            categoryId = savedCategory._id;
            let savedProduct = await Product.create({...product, category: savedCategory._id});
            productId = savedProduct._id;
            done();
        });
    });

    it('Get All Products', function() {
        Product.find({}).then((result) => {
            assert(result.length === 1);
        });
    })

    it('Get Single Product', function() {
        Product.find({_id: productId}).then((result) => {
            assert(result || false);
        });
    });

    it('Get Products of a Category', function() {
        Product.find({category: categoryId}).then((result) => {
            assert(result && result.length > 0 ? true : false);
        });
    });

    after(async function(){
        await Promise.all([Product.deleteMany({}), Category.deleteMany({})]);
    });

});