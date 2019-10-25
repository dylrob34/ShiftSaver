var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var env = require('dotenv');
var nodemailer = require('nodemailer');
var verifyToken = require('./auth.js').verifyToken;
var jwt = require('jsonwebtoken');
var business = require('../database/business');

/* POST to login url: /auth/login */
router.post('/', verifyToken, async function (req, res) {
    jwt.verify(req.token, process.env.secretKey, async function(err, authData) {
        if (err) {
            res.json({error: true});
        } else {
            var email = await business.getEmail(req.body.to);
            if (email == false || typeof email == "undefined") {
                console.log("Error: idk");
                res.json({ error: true });
            } else {
                if (email != "") {
                    sendMail(email,
                             req.body.subject,
                             req.body.text);
                    res.json({ error: false, sent: true });
                } else {
                    res.json({ error: false, sent: false });
                }
            }
        }
    });
});

function sendMail(mailto, subject, text) {
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
        to: mailto, //this should be dynamically grabbed from session and/or database
        subject: subject,
        text: text
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
