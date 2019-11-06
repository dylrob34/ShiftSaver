var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var verifyToken = require('./auth').verifyToken;
var jwt = require('jsonwebtoken');
var business = require("../models/business");


// creates a user. Required data in the body is shown below in the JSON object given to the createEmployee() method.
// user needs to be logged in as a manager.
router.post('/create', verifyToken, async (req, res) => {
    var user = await business.getEmployee(req.authData.employee_id);
    if (user.is_manager == 1) {
        var hashedPassword;
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            hashedPassword = hash;
        });
        console.log(hashedPassword);
        response = await business.createEmployee(
            req.body.employee_id,
            req.body.first_name,
            req.body.last_name,
            req.body.middle_initial,
            req.body.job_title,
            req.body.phone,
            req.body.email,
            req.body.manager,
            req.body.admin,
            hashedPassword
        );
        if (response) {
            res.json({ success: true, error: false });
        } else {
            res.json({ success: false, error: true });
        }
    } else {
        res.json({ success: false, error: false })
    }
});


// route returns the name of the current user as a JSON object of the format {name:"name"}
// used in front end to greet user on the main page
router.get('/getMyName', verifyToken, async (req, res) => {
    const name = await business.getFirstName(req.authData.employee_id);
    if (name === false) {
        console.log("returned false");
    }
    res.json({ name });
});

module.exports = router;