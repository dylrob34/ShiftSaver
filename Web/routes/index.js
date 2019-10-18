var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var env = require('dotenv');
var mailer = require('./sendmail.js');

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB,
});

connection.connect(function (error) {
    if (error) {
        console.log("Error: could not connect to database...");
    } else {
        console.log("Connected to database succesfully");
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  //for dev
  //res.render('index', { title: 'Shift Saver' });
  //for React
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
/* POST to login url: /auth/login */
router.post('/sendmail', function (req, res, next) {
    console.log("hmmm id=: " + req.body.employee_id);
    connection.query("SELECT * FROM employee WHERE employee_id='" + req.body.employee_id + "'", function (error, result, fields) {
        if (error || result[0] == null) {
            console.log("Error: idk");
            res.json({ error: true });
        } else {
            if (result[0].email != "") {
                mailer(result[0].email);         
                res.json({ error: false, sent: true });
            } else {
                res.json({ error: false, sent: false });
            }
        }
    });
});

module.exports = router;
