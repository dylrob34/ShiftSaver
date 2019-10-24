var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var env = require('dotenv');
var nodemailer = require('nodemailer');
var verifyToken = require('./auth.js').verifyToken;
var jwt = require('jsonwebtoken');
var application = require('../database/application');



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
router.post('/', verifyToken, function (req, res) {
    jwt.verify(req.token, process.env.secretKey, async (err, authData) => {
        if (err) {
            res.json({error: true});
        } else {
            console.log('user_id', authData.user);
            var email = await application.getEmail(authData.user);
            console.log("email is", email);
            if (email == false || typeof email == "undefined") {
                console.log("Error: idk");
                res.json({ error: true });
            } else {
                if (email != "") {
                    sendMail(user);         
                    res.json({ error: false, sent: true });
                } else {
                    res.json({ error: false, sent: false });
                }
            }
        }
    });
});

function sendMail(mailto) {
    console.log(mailto)
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sweshiftsaver@gmail.com',
            pass: 'lucaswetherall'
        }
    });
    
    var mailOptions = {
        from: 'sweshiftsaver@gmail.com',
        to: sendMail, //this should be dynamically grabbed from session and/or database
        subject: 'HA',
        text: 'Spam Lucas'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = router;