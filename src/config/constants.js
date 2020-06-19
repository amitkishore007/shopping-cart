/* eslint-disable no-undef */
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  BASE_URL: process.env.BASE_URL
}
