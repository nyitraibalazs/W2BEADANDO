const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");


const orderController = require("./routes").routes;
const shutterDataController = require("./ShutterRoutes").routes;


var app = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
    next();
});

app.use('/order/', orderController);
app.use('/shutter-data/', shutterDataController);

app.use(express.static('build'));
app.get('/', function(req, res) {
    res.sendFile(path.join('build', 'index.html'));
});

app.listen(8080, () => {
    console.log("Start App");
})

// export test
module.exports = app;
