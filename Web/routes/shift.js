var express = require('express');
var router = express.Router();
var verifyToken = require('./auth').verifyToken;
var business = require('../models/business');

//this grabs the next two weeks of shifts for you
router.get('/upcomingShifts', verifyToken, async (req, res) => {
    var user = req.authData.employee_id;
    var shifts = await business.getShiftsByEmployee(user, user);
    if (shifts == undefined) {
        shifts = null;
    }
    res.json({shifts});
})

router.post("/monthlyShifts", verifyToken, async (req, res) => {
    var user = req.authData.employee_id;
    var shifts = await business.getShiftsByEmployeeMonth(user, req.body.month+1);
    res.json({shifts})
})

module.exports = router;