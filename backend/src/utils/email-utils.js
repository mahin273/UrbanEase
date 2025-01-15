const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendPasswordToStaff(email, password) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',  // Or use your email service
        auth: {
            user: process.env.EMAIL_USER, // Your email from .env
            pass: process.env.EMAIL_PASS // Your email password from .env
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender email
        to: email, // Recipient email
        subject: 'Your Staff Account Credentials',
        text: `Hello, \n\nYour account has been created. Your login credentials are as follows:\n\nEmail: ${email}\nPassword: ${password}\n\nPlease change your password after logging in.\n\nRegards, \nAdmin`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Password email sent to:', email);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send password email');
    }
}

module.exports = { sendPasswordToStaff };
