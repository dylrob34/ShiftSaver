var express = require('express');
var router = express.Router();
var verifyToken = require('./auth').verifyToken;
var business = require('../models/business');

router.post('/create', verifyToken, async (req, res) => {
    var user = await business.getIsManager(req.authData.employee_id);
    if (user) {
        var employee;
        if (req.body.employee == undefined) {
            employee = null;
        } else {
            employee = "'" + req.body.employee + "'"
        }
        business.createShift(
            req.body.date,
            req.body.start,
            req.body.end,
            employee
        );
        res.json({success: true, auth: true});
    } else {
        res.json({success: false, auth: false});
    }

})

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

router.post("/day", verifyToken, async (req, res) => {
    var user = await business.getIsManager(req.authData.employee_id);
    if (user) {
        var shifts = await business.getShiftsByDay(req.body.day);
        if (shifts != false) {
            res.json({shifts, error: false, auth: true});
        } else {
            res.json({shifts, error: true, auth: true});
        }
    } else {
        res.json({error:false, auth: false});
    }
})

router.post("/delete", verifyToken, async (req, res) => {
    var user = await business.getIsManager(req.authData.employee_id);
    if (user) {
        const response = await business.deleteShift(req.body.shift_id);
        if (response) {
            res.json({success: true});
        } else {
            res.json({success: false});
        }
    }
})

router.post("/update", verifyToken, async (req, res) => {
    var user = await business.getIsManager(req.authData.employee_id);
    if (user) {
        const response = await business.updateShift(req.body.shift_id, req.body.employee);
        if (response) {
            res.json({success: true});
        } else {
            res.json({success: false});
        }
    } else {
        res.json({success: false});
    }
})

module.exports = router;