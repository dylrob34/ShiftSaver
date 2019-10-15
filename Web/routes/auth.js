var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var env = require('dotenv');


var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DB,
});

connection.connect(function(error) {
  if (error) {
    console.log("Error: could not connect to database...");
  } else {
    console.log("Connected to database succesfully");
  }
});

/* GET users listing. */
router.post('/login', function(req, res, next) {
  connection.query("SELECT * FROM employee WHERE first_name='" + req.body.username + "'", function(error, result, fields) {
    if (error || result[0]==null) {
      console.log("Error: idk");
      res.json({error:true});
    } else {
      if (result[0].email == req.body.password) {
        res.json({error: false, login: true});
      } else {
        res.json({error: false, login: false});
      }
    }
  });
});

module.exports = router;
