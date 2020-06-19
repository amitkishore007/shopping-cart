// import apiRoutes from './modules';
const middlewares = require('./moddlewares');
const modules = require('./modules');
const express = require('express');
const constants = require('./config/constants');
const errorMiddleware  = require('./moddlewares/error');
const db = require('./config/database');

const app = express();


middlewares(app);
modules(app);
errorMiddleware(app);

db()
  .then(async () => {
    
      console.log('Connected to Database...');
    
      // eslint-disable-next-line no-unused-vars
      const server = await app.listen(constants.PORT, err => {
      if (err) {
        console.log('Failed to start server', err.message);
        // eslint-disable-next-line no-undef
        process.exit(0);
      }

      console.log(`Service listening on port ${constants.PORT}!`);
    });
  })
  .catch(error => {
    console.log('Failed to connect mongo server', error.message);
  });