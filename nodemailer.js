const nodemailer = require('nodemailer');
require('dotenv').config()

const transporter = nodemailer.createTransport({
    host: " smtp.mail.me.com",
    port: 587 ,
    secure: true,
    auth: {
        user: 'aibulat.urazov@icloud.com',
        pass: 'Perasperaadastra1987'
    },
});

const mailer = (message) => {
    transporter.sendMail(message, (err, info) => {
        if (err) return console.log(err);
    })
}

module.exports = mailer;