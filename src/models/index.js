const POSTGRES_URI = process.env.POSTGRES_URI ||  "postgres://postgres@localhost:5432/authdb";
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config()

const users=require('./user')
var sequelize = new Sequelize(POSTGRES_URI, {});

module.exports = {
    db: sequelize,
    users: users(sequelize, DataTypes),
    
}
