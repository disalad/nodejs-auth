const nodemailer = require('nodemailer');
const keys = require('../config/keys');

async function sendEmail(to, verificationUri) {
    let transporter = nodemailer.createTransport({
        host: keys.nodemailer.host,
        port: keys.nodemailer.port,
        secure: false,
        auth: {
            user: keys.nodemailer.email,
            pass: keys.nodemailer.password,
        },
    });

    let info = await transporter.sendMail({
        from: `"${keys.nodemailer.displayName}" <${keys.nodemailer.email}>`,
        to: to,
        subject: 'node-passport-auth Email Verification',
        html: `<p><a href=${verificationUri}>Click here</a> to verify your account</p>`,
    });

    console.log('Message sent: %s', info.messageId);
}

module.exports = sendEmail;
