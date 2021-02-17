const nodemailer = require('nodemailer');
const handlebars = require('nodemailer-express-handlebars');
const path = require('path');

const { host, port, user, pass } = require('../config/mail.json');

const transport = nodemailer.createTransport({
  host, 
  port,
  auth: { user, pass }
});

const handlebarOptions = {
  viewEngine: {
    extName: '.html',
    partialsDir: path.resolve('./src/resources/mail/auth/'),
    layoutsDir: path.resolve('./src/resources/mail/auth/'),
    defaultLayout: 'esqueci_minha_senha.html',
  },
  viewPath: path.resolve('./src/resources/mail/auth/'),
  extName: '.html',
};

transport.use('compile', handlebars(handlebarOptions));

module.exports = transport;