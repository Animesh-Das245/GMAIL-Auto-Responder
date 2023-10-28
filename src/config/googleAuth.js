require('dotenv').config();
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

module.exports = { gmail, oauth2Client };


