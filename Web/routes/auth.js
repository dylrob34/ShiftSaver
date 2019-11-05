var express = require('express');
var router = express.Router();
var env = require('dotenv');
var jwt = require('jsonwebtoken');
var business = require('../models/business');

/* POST to login url: /auth/login */
router.post('/login', async function(req, res) {
  var user = await business.getEmployee(req.body.username);
  if (user === false || (typeof user) == "undefined") {
    console.log("Error: idk");
    res.json({error:true});
  } else {
    if (user.email == req.body.password) {
        jwt.sign({employee_id: user.employee_id}, process.env.secretKey, { expiresIn: "2h" }, (err, token) => {
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

router.get('/checkLogin', verifyToken, async (req, res) => {
  var name = await business.getFirstName(req.authData.employee_id);
  res.json({name});
});


// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

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
