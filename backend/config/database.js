const { Sequelize } = require('sequelize');

const database = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const dialect = process.env.DB_DIALECT;
const port = process.env.DB_PORT;
const db_url = `mysql://${username}:${password}@${host}:${port}/${database}`;

const sequelize = new Sequelize(db_url ,{ logging: false,});

module.exports = sequelize;