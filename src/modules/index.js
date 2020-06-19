const categoryRoutes = require('./category/category.routes');
const productRoutes = require('./product/product.routes');
const cartRoutes = require('./cart/cart.routes');
const sessionRoutes = require('./session/session.routes');
const auth = require('../moddlewares/auth');

module.exports = (app) => {
    app.use('/api/v1/categories', categoryRoutes);
    app.use('/api/v1/products', productRoutes);
    app.use('/api/v1/cart', auth , cartRoutes);
    app.use('/api/v1/session', sessionRoutes);
}