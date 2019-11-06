var express = require('express');
var router = express.Router();
var env = require('dotenv');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var business = require('../models/business');

/* POST to login url: /auth/login */
// this route is used to login, signed key is sent back in response, should be saved and sent with every request from the front end.
router.post('/login', async function (req, res) {
  var user = await business.getEmployee(req.body.username);
  if (user === false || (typeof user) == "undefined") {
    console.log("Error: idk");
    res.json({ error: true });
  } else {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result) {
        jwt.sign({ employee_id: user.employee_id }, process.env.secretKey, { expiresIn: "2h" }, (err, token) => {
          if (err) {
            console.log("signing error");
            res.json({error: true});
          } 
          res.json({
            error: false,
            login: true,
            token
          });
        });
      } else {
        res.json({error: true});
      }
    });
  }
});


// sends back the user Id if the person is succesfully logged in.
router.get('/checkLogin', verifyToken, async (req, res) => {
  var name = await business.getFirstName(req.authData.employee_id);
  res.json({name});
});


// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
// This function checks for a token and if it is verified, adds the authorization data to the request and calls next();
// if a valid key is not included in the request a response is sent back {loggedIn: false}
// should be called as middleware on every route that gets or sets data in the database
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    
    jwt.verify(bearerToken, process.env.secretKey, async (err, data) => {
      if (err) {
        res.json({loggedIn: false});
      } else {
        req.authData = data;
      }
    })
    next();
  } else {
    res.json({error: true});
  }
}

module.exports = { router, verifyToken };
