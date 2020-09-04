const path = require('path');
// console.log("__dirname : " + __dirname);
// console.log(".env : " + path.resolve(__dirname, '../.env'));
// console.log("process.env.DATABASE_URL : " + process.env.DATABASE_URL);

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

//console.log("process.env.DATABASE_URL : " + process.env.DATABASE_URL);

module.exports = {
  development: {
    "use_env_variable": "DATABASE_URL",
    dialect: 'postgres'
  },
  test: {
    "use_env_variable": "DATABASE_URL",
    dialect: 'postgres'
  },
  production: {
    "use_env_variable": "DATABASE_URL",
    dialect: 'postgres'
  },
}