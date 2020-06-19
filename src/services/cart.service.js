const ProductModel = require('../modules/product/product.model');
const Cart = require('../modules/cart/cart.model');

const addTocart = async (user_id, product_id, quantity) => {
    // eslint-disable-next-line no-useless-catch
    try {
        let Product = await ProductModel.findOne({ _id: product_id });

        if(!Product) {
            // return resource not found
        }

        let productQty = 1;
        if(quantity) {
            productQty = quantity;
        }

        const productData = {
            name: Product.name,
            price: +Product.price,
            product_id: Product.id,
            quantity: productQty
        }

        let updateQuery = { $inc: {quantity: productQty, total: +Product.price, "products.$.quantity": productQty} };
      
        let filter = {user_id: user_id, "products.name": {$exists: true}};
        
        const productExists = await Cart.findOne({"products.product_id": Product.id});
      
        if(!productExists) {
      
            updateQuery = { $inc: { quantity: productQty, total: +Product.price }, $push: { products: productData }};
      
            filter = {user_id: user_id, "products.name": {$exists: true}};
        }

        return await Cart.updateOne(filter, updateQuery, { upsert: true });
    } catch(error) {
        throw error;
    }
}


module.exports = {
    addTocart
}