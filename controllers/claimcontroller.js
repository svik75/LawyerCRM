const Claim = require('../models/claim')
const sm = require('./sendmail')


module.exports.getClaimUl = async function (req, res) {
    try {
        query = {isCompany: true};
        if (req.query.done) {
            query.done = true 
        }

        if (req.query.status) {
            query.status = req.query.status 
        }

        if (req.query.startDate) {
            query.date = { $gte: req.query.startDate }

        }
        
        if (req.query.endDate) {
            if (!query.date) {
                query.date = {}
            }
            query.date['$lte'] = req.query.endDate

        }
        const claims = await
           Claim.find(query).sort({ date: -1 }).skip(+req.query.offset).limit(+req.query.limit)

        res.status(200).json(claims)

    }
    catch (error) {
        console.log(error)
    }
}
// --------------------------------------------------
module.exports.getClaimFl = async function (req, res) {
    try {
        query = {isCompany: false};
        if (req.query.done) {
            query.done = true 
        }

        if (req.query.status) {
            query.status = req.query.status 
        }

        if (req.query.startDate) {
            query.date = { $gte: req.query.startDate }

        }
        
        if (req.query.endDate) {
            if (!query.date) {
                query.date = {}
            }
            query.date['$lte'] = req.query.endDate

        }
        const claims = await
           Claim.find(query).sort({ date: -1 }).skip(+req.query.offset).limit(+req.query.limit)

        res.status(200).json(claims)

    }
    catch (error) {
        console.log(error)
    }
}
// --------------------------------------------------
module.exports.create = async function (req, res) {
    try {
        const claim = await new Claim({
            name: req.body.name,
            phone:  req.body.phone,
            email: req.body.email,
            status: req.body.status,
            isCompany: req.body.isCompany,
            done: req.body.done,
            history: req.body.history,
            date: new Date(),
            queryPath: req.body.queryPath
        }).save()
        sm.sendEmail('Новая заявка на услугу с сайта legal-msk.ru')

        res.status(200).json(claim)
    }
    catch (error) {
        console.log(error)
    }
}

// ---------------------------------------------
module.exports.update = async function (req, res) {
    try {
        const claim = await Claim.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    phone: req.body.phone,
                    email: req.body.email,
                    status: req.body.status,
                    done: req.body.done,
                    history: req.body.history,
                    isCompany: req.body.isCompany
                }
            },
            {returnOriginal: false })
        res.status(200).json(claim)
    }
    catch (error) {
        console.log(error)
    }
}

// --------------------------------------------------
module.exports.getById = async function (req, res) {
    try {
        const claim = await Claim.findById(
            req.params.id
        )
        res.status(200).json(claim)
    }
    catch (error) {
        console.log(error)
    }
}

// ---------------------------------------------------
module.exports.delete = async function (req, res) {
    try {
        await Query.remove({ _id: req.params.id })

        res.status(200).json({ message: 'Claim deleted!' })
    }
    catch (error) {
        console.log(error)
    }
}