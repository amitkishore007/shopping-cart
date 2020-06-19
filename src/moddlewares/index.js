const bodyParser = require('body-parser');
const cors = require('./cors');

module.exports = (app) => {

    app.use(bodyParser.json({ limit: '50mb' }));
    
    cors(app);

    app.use((req, res, next) => {
        // remove header key X-Powered-By from request
        res.removeHeader('X-Powered-By');
        
        next();
    });
}
