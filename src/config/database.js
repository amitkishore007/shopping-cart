const mongoose = require('mongoose');
const constants = require('./constants');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = () => {
    return mongoose.connect(constants.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};