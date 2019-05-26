const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");

const orderRoutes = require("./src/controller/OrderController").routes;
const shutterDataRoutes = require("./src/controller/ShutterDataController").routes;

const connectToDatabase = require('./src/database/DatabaseConnection').connectToDatabase;

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.use('/', indexRoutes);
app.use('/order/', orderRoutes);
app.use('/shutter-data/', shutterDataRoutes);

connectToDatabase();
module.exports = app;
