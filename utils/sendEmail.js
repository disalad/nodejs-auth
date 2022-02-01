const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendEmail(to, verificationUri) {
    let transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,
        port: process.env.NODEMAILER_PORT,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: `"${process.env.NODEMAILER_DISPLAYNAME}" <${process.env.NODEMAILER_EMAIL}>`,
        to: to,
        subject: 'node-passport-auth Email Verification',
        html: `<p><a href=${verificationUri}>Click here</a> to verify your account</p>`,
    });

    console.log('Message sent: %s', info.messageId);
}

module.exports = sendEmail;
