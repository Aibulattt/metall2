const {Router} = require('express');
const router = Router();
const mailer = require('./nodemailer');

router.post('/send', async (req, res) => {
    try {
        let tarif;
        if (req.body.tarif === 'tarif-base') tarif = 'Базовый'
        else if (req.body.tarif === 'tarif-start') tarif = 'Cтарт'
        else if (req.body.tarif === 'tarif-prem') tarif =  'Премиум'

        const message = {
            from: 'Mail Test, <coffee.marketing@yandex.ru>',
            to: 'coffee.marketing@yandex.ru',
            subject: 'Данные о заявке',
            html: `<h1>Данные пользователя: </h1>
                    <ul>
                        <li>Имя пользователя: ${req.body.name}</li>
                        <li>Телефон: ${req.body.tel}</li>
                        ${req.body.email ? `<li>Почта: ${req.body.email}</li>` : ''}
                        ${req.body.tarif ? `<li>Тариф: ${tarif}</li>` : ''}
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