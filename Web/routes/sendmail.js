var nodemailer = require('nodemailer');

function sendmail(mailto) {
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
        subject: 'Weekly Shift',
        text: 'Here is your schedule for the week: '
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = sendmail;