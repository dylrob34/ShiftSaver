var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var env = require('dotenv');

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB,
});

connection.connect(function (error) {
    if (error) {
        console.log("Error: could not connect to database...");
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  //for dev
  //res.render('index', { title: 'Shift Saver' });
  //for React
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = router;
