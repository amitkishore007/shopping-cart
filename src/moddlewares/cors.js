const cors = require('cors');

module.exports = (app) => {
    const corsOptions = {
        origin: "*",
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
    };

    app.use(cors(corsOptions));
}