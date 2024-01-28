const nodemailer = require('nodemailer');

require('dotenv').config({ path: '.env.local' });

const transporter = nodemailer.createTransport({
    host: "mail.wpless.com",
    port: 587,
    secure: false,
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

// send mail
const sendMail = (mailOptions) => {
    mailOptions.from = process.env.SMTP_EMAIL;
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
}


module.exports = sendMail;