var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shiftsaver2019@gmail.com',
        pass: 'Swe2019!'
    }
});

var mailOptions = {
    from: 'shiftsaver2019@gmail.com',
    to: 'lucaswetherall@yahoo.com', //this should be dynamically grabbed from session and/or database
    subject: 'Weekly Shift',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});