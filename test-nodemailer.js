const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: undefined,
        pass: undefined 
    },
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 5000
});

async function main() {
    console.log("sending...");
    try {
        await transporter.sendMail({
            from: undefined,
            to: undefined,
            subject: 'Test',
            text: 'test'
        });
        console.log("Success");
        process.exit(0);
    } catch(e) {
        console.error("Failed:", e.message);
        process.exit(1);
    }
}
main();
