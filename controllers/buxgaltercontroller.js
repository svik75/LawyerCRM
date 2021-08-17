const sm = require('./sendmail')

// --------------------------------------------------
module.exports.create = async function (req, res) {
    try {
       
        sm.sendEmailViaBody(req)

        res.status(200)
    }
    catch (error) {
        console.log(error)
    }
}
