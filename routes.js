const {Router} = require('express');
const router = Router();
const mailer = require('./nodemailer');

router.post('/send', async (req, res) => {
    try {

        const message = {
            from: 'Mail Test, <aibulat.urazov@icloud.com>',
            to: 'aibulat.urazov@icloud.com',
            subject: 'Данные о заявке',
            html: `<h1>Данные пользователя: </h1>
                    <ul>
                        <li>Имя пользователя: ${req.body.name}</li>
                        ${req.body.email ? `<li>Почта: ${req.body.email}</li>` : ''}
                        ${req.body.message ? `<li>Сообщение: ${req.body.message}</li>` : ''}
                    </ul>
            `
        }  
        mailer(message);
        res.status(200).json({message: 'Form sending!'})  
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;