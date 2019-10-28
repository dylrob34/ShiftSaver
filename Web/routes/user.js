var express = require('express');
var router = express.Router();
var verifyToken = require('./auth').verifyToken;
var jwt = require('jsonwebtoken');
var business = require("../database/business");

router.post('/create', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.secretKey, async (err, authData) => {
        if (err) {
            res.json({error: true});
        } else {
            var user = await business.getEmployee(authData.employee_id);
            if (user.is_manager == 1) {
                response = await business.createEmployee(
                    req.body.employee_id,
                    req.body.first_name,
                    req.body.last_name,
                    req.body.middle_initial,
                    req.body.job_title,
                    req.body.phone,
                    req.body.email,
                    req.body.manager,
                    req.body.admin
                );
                if (response) {
                    res.json({success: true, error: false});
                } else {
                    res.json({success: false, error: true});
                }
            } else {
                res.json({success: false, error: false})
            }
        }
    });
});

router.get('/getMyName', verifyToken, async (req, res) => {
    console.log("running the route?");
    jwt.verify(req.token, process.env.secretKey, async (err, authData) => {
        if (err) {
            console.log("error");
            res.json({name:"ERROR"});
        } else {
            const name = await business.getFirstName(authData.employee_id);
            console.log("got name");
            if (name === false) {
                console.log("returned false");
            }
            res.json({name});
        }
    });
});

module.exports = router;