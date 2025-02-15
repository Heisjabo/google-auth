const dotenv = require('dotenv');
require('ts-node/register');
dotenv.config();
module.exports = {
  username: process.env.DB_USER,
  password:  process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: 'localhost',
  dialect: 'postgres',
};

