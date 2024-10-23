
let nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'ntgrsavage@gmail.com',
        pass:'Big123fat456liar'
    }
});
let mailOptions = {
    from: 'ntgrsavage@gmail.com',
    to: 'hiresoso18@gmail.com',
    subject: 'Sending email using node.js',
    text: 'Ndagukunda!!',
    html: '<b>Ndagukunda!!</b>'
};
transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
})  