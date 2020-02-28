const nodemailer = require("nodemailer");

module.exports.sendEmail = async function(msg) {

let transporter = nodemailer.createTransport({
    host: "legal-msk.ru",
    port: 587,
    tls: {
        rejectUnauthorized:false
    },
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'info@garantk.ru', // generated ethereal user
      pass: 'Info_1' // generated ethereal password
    }
  })
  let info
try{
  // send mail with defined transport object
  info = await transporter.sendMail({
    from: 'Garantk info', // sender address
    to: "lawyer@garantk.ru", // list of receivers
    subject: msg, // Subject line
    text: msg, // plain text body
    html: "<b>Перейдите в раздел администратора для работы с вопросом.</b>" // html body
  })
    console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}
  catch(error) {
      console.log(error)
  }

  

}

