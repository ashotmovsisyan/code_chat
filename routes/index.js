const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');
const config = require('../config');
const transporter = nodemailer.createTransport(config.mailer);

/* GET home page. */
router.get('/', (req, res) => {
    res.render('index', {title: 'Code4Share - a platform for sharing code.'});
});

router.get('/about', (req, res) => {
    res.render('about', {title: 'Code4Share - a platform for sharing code.'});
});

router.route('/contact').get((req, res) => {
    res.render('contact', {title: 'Code4Share - a platform for sharing code.'});
}).post((req, res) => {
    req.checkBody('name', 'Empty name').notEmpty();
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('message', 'Empty message').notEmpty();
    const errors = req.validationErrors();

    if (errors) {
        res.render('contact', {
            title: 'Code4Share - a platform for sharing code.',
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            errorMessages: errors
        });
    } else {
        const mailOptions = {
            from: 'Code4Share <no-reply@code4share.com>',
            to: 'demo.code4startup@gmail.com',
            subject: 'You got a new message from visitor 💋 😽',
            text: req.body.message
        };
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                return console.log(error);
            }
            res.render('thank', {title: 'Code4Share - a platform for sharing code.'});
        });
    }
});

module.exports = router;
