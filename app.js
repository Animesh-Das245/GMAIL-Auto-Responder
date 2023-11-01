const express = require('express');
const dotenv = require('dotenv');
const { emailProcessing } = require('./src/controllers/emailController');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    emailProcessing();  // Start email processing once server starts
});
