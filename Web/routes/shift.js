var express = require('express');
var router = express.Router();
var verifyToken = require('./auth').verifyToken;
var business = require('../models/business');

//this grabs the next two weeks of shifts for you
router.get('/upcomingShifts', verifyToken, async (req, res) => {
    var user = req.authData.employee_id;
    const shifts = await business.getShiftsByEmployee(user, user);
    console.log("shifts", shifts);
})

module.exports = router;