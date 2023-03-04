const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')
const seeders = require('../config/seeders.config')
const NodeEnv = process.env.NODE_ENV


const transporter = nodemailer.createTransport({
    host: seeders[NodeEnv].email_host,
    port: seeders[NodeEnv].email_port,
    secure: true,
    auth: {
        user: seeders[NodeEnv].admin_email,
        pass: seeders[NodeEnv].admin_password
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
        from: `"Demo Credit Server" <${seeders[NodeEnv].admin_email}>`,
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