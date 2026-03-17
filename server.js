require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
require('dns').setDefaultResultOrder('ipv4first');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.email,
        pass: process.env.password
    },
    family: 4,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
});

const sendEmail = async (type, res) => {
    try {
        if (!process.env.email || !process.env.password || !process.env.hr_email) {
            throw new Error("Missing email credentials or HR email in environment variables.");
        }

        const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        
        let subject, body;
        if (type === 'login') {
            subject = 'Login update';
            body = `Dear HR Team,\n\nI am writing to confirm my attendance for Today \nEmp Id: CIN-73880\nLogin Time: ${timeStr}\n\n\n\nRegards,\nSrikanth Pandaraboina\nPhone: +91 8340032723\nEmail: srikanthpandaraboina38@gmail.com\n`;
        } else {
            subject = 'Logout Update';
            body = `Dear HR Team,\n\nI am writing to confirm my attendance for Today \nEmp Id: CIN-73880\nLogout Time: ${timeStr}\n\n\n\nRegards,\nSrikanth Pandaraboina\nPhone: +91 8340032723\nEmail: srikanthpandaraboina38@gmail.com\n`;
        }

        const info = await transporter.sendMail({
            from: process.env.email,
            to: process.env.hr_email,
            subject: subject,
            text: body
        });
        
        console.log(`Email sent: ${info.messageId}`);
        return res.json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ success: false, message: 'Failed to send email.', error: error.message });
    }
};

app.post('/api/login', (req, res) => {
    sendEmail('login', res);
});

app.post('/api/logout', (req, res) => {
    sendEmail('logout', res);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
