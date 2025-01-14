require('dotenv').config(); // This will load environment variables from the .env file

const nodemailer = require('nodemailer');

exports.sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER, // Access email from environment variable
            pass: process.env.EMAIL_PASS, // Access password from environment variable
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    });
};
