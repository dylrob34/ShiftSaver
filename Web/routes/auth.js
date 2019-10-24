var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var env = require('dotenv');
var jwt = require('jsonwebtoken');

var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DB,
});

connection.connect(function(error) {
  if (error) {
    console.log("Error: could not connect to database...");
  }
});

/* POST to login url: /auth/login */
router.post('/login', async function(req, res, next) {
  connection.query("SELECT * FROM employee WHERE first_name='" + req.body.username + "'", function(error, result) {
    user = result[0];
    if (error || user==null) {
      console.log("Error: idk");
      res.json({error:true});
    } else {
      if (user.email == req.body.password) {
          jwt.sign({user: user.employee_id}, process.env.secretKey, { expiresIn: "2h" }, (err, token) => {
          if (err) {
            console.log("signing error");
          }
          res.json({
            error: false,
            login: true,
            token
          });
        });
      } else {
        res.json({error: false, login: false});
      }
    }
  });
});

router.get('/checkLogin', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.secretKey, (err, authData) => {
    if (err) {
      res.json({error: true});
    } else {
      res.json({
        error: false,
        authData
      });
    }
  });
});


// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.json({error: true});
  }
}

module.exports = { router, verifyToken };
