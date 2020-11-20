const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();


router.get('/', (req, res) => {
    const success = req.flash('success');
    console.log(success);
    res.render('index', { title: 'Inicio' });
});

router.get('/servicios', (req, res) => {
    res.render('services', { title: 'Servicios' });
});

router.get('/acercade', (req, res) => {
    res.render('aboutus', { title: 'Acerca de Nosotros' });
});

router.get('/contacto', (req, res) => {
    const success = req.flash('success');
    console.log(success[0]);
    res.render('contact', { title: 'Contacto', success});
});

router.post('/enviar-email', (req, res) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });

    let mailOptions = {
        from: req.body.remitente,
        to: process.env.MAIL_USER,
        subject: req.body.asunto,
        text: req.body.mensaje
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            req.flash('success', '2');
        } else {
            req.flash('success', '1');
        }
        res.redirect('/contacto');
    })
});

module.exports = router;
