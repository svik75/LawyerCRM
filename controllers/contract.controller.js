const Contract = require('../models/contract')


module.exports.getContracts = async function (req, res) {
    try {
        
        query = {};
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
        const contracts = await
           Contract.find(query).sort({ date: -1 }).skip(+req.query.offset).limit(+req.query.limit)

        res.status(200).json(contracts)

    }
    catch (error) {
        console.log(error)
    }
}
// --------------------------------------------------
module.exports.create = async function (req, res) {
    try {
        const contract = await new Contract({
            name: req.body.name,
            phone:  req.body.phone,
            email: req.body.email,
            status: req.body.status,
            isCompany: req.body.isCompany,
            done: req.body.done,
            contractDescription: req.body.contractDescription,
            date: new Date(),
            contractSum: req.body.contractSum,
            comments: req.body.comments,
            payments: req.body.payments
        }).save()

        res.status(200).json(contract)
    }
    catch (error) {
        console.log(error)
    }
}

// ---------------------------------------------
module.exports.update = async function (req, res) {
    try {
        const contract = await Contract.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    phone: req.body.phone,
                    email: req.body.email,
                    status: req.body.status,
                    done: req.body.done,
                    payments: req.body.payments,
                    isCompany: req.body.isCompany, 
                    debt: req.body.debt,
                    contractDescription: req.body.contractDescription,
                    contractSum: req.body.contractSum,
                    comments: req.body.comments

                }
            },
            {returnOriginal: false })
        res.status(200).json(contract)
    }
    catch (error) {
        console.log(error)
    }
}

// --------------------------------------------------
module.exports.getById = async function (req, res) {
    try {
        const contract = await Contract.findById(
            req.params.id 
        )
        res.status(200).json(contract)
    }
    catch (error) {
        console.log(error)
    }
}

// ---------------------------------------------------
module.exports.delete = async function (req, res) {
    try {
        await Contract.remove({ _id: req.params.id })

        res.status(200).json({ message: 'Contract deleted!' })
    }
    catch (error) {
        console.log(error)
    }
}