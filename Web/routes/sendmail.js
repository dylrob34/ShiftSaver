var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var env = require('dotenv');
var nodemailer = require('nodemailer');
var verifyToken = require('./auth.js').verifyToken;
var jwt = require('jsonwebtoken');
var application = require('../database/application');

/* POST to login url: /auth/login */
router.post('/', verifyToken, async function (req, res) {
    jwt.verify(req.token, process.env.secretKey, async function(err, authData) {
        if (err) {
            res.json({error: true});
        } else {
            var email = await application.getEmail(authData.user);
            if (email == false || typeof email == "undefined") {
                console.log("Error: idk");
                res.json({ error: true });
            } else {
                if (email != "") {
                    sendMail(email);
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
        to: mailto, //this should be dynamically grabbed from session and/or database
        subject: 'Your Weekly Shifts',
        text: 'Your shifts for the week...'
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
