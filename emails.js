const express = require('express');
const email = express.Router();
const nodeMailer = require('nodemailer');

email.post('/send', (req, res, next) => {
    let transporter = nodeMailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "50b6b5a7cc46e4",
            pass: "571cdac0f18ce8"
        }
    });

    let mailOptions = {
        from: '"User User" <user@gmail.com>', // sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.body, // plain text body
        html: `<b>${req.body.body}</b>` // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            next(error);
            return;
        }
        return res.status(200).json({ success: true });
    });
});










module.exports = email;