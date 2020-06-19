const assert = require('assert');
const Category = require('../../src/modules/category/category.model');
const Product = require('../../src/modules/product/product.model');
const db = require('../../src/config/database');
let mongoose = require('mongoose');

describe('Categories', function(done) {
    
    let category = {
        name: "T-Shirt",
        type: "clothing"
    };

    let product = {
        name: "Round neck T-Shirt",
        description: "This is a clothing product",
        price: 12.2,
        make: 2019
    }

    let categoryId;
    // Prepare the category and products in the databse
    before(function(done) {
        db().then(async () => {
            await Category.deleteMany({});
            await Product.deleteMany({});
            let saved = await Category.create(category);
            categoryId = saved._id;
            await Product.create({...product, category: saved._id});
            done();
        });
    });
    
    it('Get All Category', function(done) {
        Category.find({}).then((result) => {
            assert(result.length === 1);
            done();
        });
    });

    it('Get Category with valid id', function(done) {
        Category.findOne({_id: categoryId}).then((result) => {
            assert(result && result._id.toString() === categoryId.toString());
            done();
        })
    });

    it('Get Category with invalid id', function() {
        let randomId = mongoose.Types.ObjectId();
        Category.findOne({_id: randomId}).then((result) => {
            assert(!result);
        })
    });

    after(async function(){
        await Promise.all([Product.deleteMany({}), Category.deleteMany({})]);
    });

});