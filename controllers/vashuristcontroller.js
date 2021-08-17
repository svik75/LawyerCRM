const sm = require('./sendmail')

// --------------------------------------------------
module.exports.create = async function (req, res) {
    try {
       
        sm.sendEmail('Новая заявка с сайта вашюрист.москва')

        res.status(200)
    }
    catch (error) {
        console.log(error)
    }
}