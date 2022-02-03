const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config();

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN,
    GOOGLE_REDIRECT_URI,
    NODEMAILER_EMAIL,
    NODEMAILER_DISPLAYNAME,
} = process.env;

const oAuth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI,
);
oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

async function sendMail(to, verificationURL) {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: NODEMAILER_EMAIL,
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            refreshToken: GOOGLE_REFRESH_TOKEN,
            accessToken: accessToken,
        },
    });

    const mailOptions = {
        from: `${NODEMAILER_DISPLAYNAME} <${NODEMAILER_EMAIL}>`,
        to,
        subject: 'Verification Email',
        html: `<p><a href=${verificationURL}>Click here</a>to verify your account</p>`,
    };
    const result = await transport.sendMail(mailOptions);
    return result;
}

module.exports = sendMail;
