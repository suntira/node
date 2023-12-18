const express = require('express');
const app = express()
const  bodyParser = require('body-parser');
const urlencoded = bodyParser.urlencoded({extended: false});
const Sequelize = require('sequelize');
const sequelize = new Sequelize("BBdd", "root", "", {
    dialect: 'mysql',
    host: 'localhost',
});