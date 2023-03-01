const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')
const seeders = require('../config/seeders.config')
const NodeEnv = process.env.NODE_ENV

const transporter = nodemailer.createTransport({
    host: seeders.EMAIL_HOST,
    port: seeders.EMAIL_PORT,
    secure: true,
    auth: {
        user: seeders.ADMIN_EMAIL,
        pass: seeders.ADMIN_PASSWORD
    }
});

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./templates/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./templates/'),
};
transporter.use('compile', hbs(handlebarOptions))

module.exports.errorNotifier = (email, errorStack)=>{
    transporter.use('compile', hbs(handlebarOptions))
    var mailOptions = {
        from: `"${seeders[NodeEnv].SERVER_NAME}" <${seeders[NodeEnv].ADMIN_EMAIL}>`,
        to: email,
        subject: "Urgent: Demo Credit Server Error",
        template: 'serverError',
        context:{
            errorStack:errorStack
        }
    };
    transporter.sendMail(mailOptions, function(error, info){    
        if(error){
            return console.log(error)
        }
    })
}