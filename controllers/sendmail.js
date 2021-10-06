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
      user: 'info@gkons.ru', // generated ethereal user
      pass: 'Info31528' // generated ethereal password
    }
  })
  let info
try{
  // send mail with defined transport object
  info = await transporter.sendMail({
    from: 'Garantk info', // sender address
    to: "help@legal-msk.ru", // list of receivers
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

module.exports.sendEmailViaBody = async function(req) {

  let transporter = nodemailer.createTransport({
      host: "legal-msk.ru",
      port: 587,
      tls: {
          rejectUnauthorized:false
      },
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'info@gkons.ru', // generated ethereal user
        pass: 'Info31528' // generated ethereal password
      }
    })
    let info
  try{
    // send mail with defined transport object
    info = await transporter.sendMail({
      from: 'Garantk info', // sender address
      to: "help@legal-msk.ru", // list of receivers
      subject: req.body.title, // Subject line
      text: req.body.body, // plain text body
      html: `${req.body.body}` // html body
    })
      console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  
  }
    catch(error) {
        console.log(error)
    }
  
    
  
  }
  
  

