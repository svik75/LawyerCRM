const Query = require('../models/query')
const sm = require('./sendmail')

module.exports.getAll = async function (req, res) {
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
        const querys = await
           Query.find(query).sort({ date: -1 }).skip(+req.query.offset).limit(+req.query.limit)

        res.status(200).json(querys)
    }
    catch (error) {
        console.log(error)
    }
}

// -------------------------------------------------------
module.exports.getByUser = async function (req, res) {
    try {
        const query = await Query.find(
            { User: req.params.User }
        )
        res.status(200).json(query)
    }
    catch (error) {
        console.log(error)
    }
}
// --------------------------------------------------
module.exports.getById = async function (req, res) {
    try {
        const query = await Query.findById(
            req.params._id
        )
        res.status(200).json(query)
    }
    catch (error) {
        console.log(error)
    }
}

module.exports.create = async function (req, res) {
    try {
        const query = await new Query({
            name: req.body.name,
            query: req.body.query,
            phone:  req.body.phone,
            email: req.body.email,
            status: req.body.status,
            done: req.body.done,
            history: req.body.history,
            date: new Date(),
            queryPath: req.body.queryPath
        }).save()
        sm.sendEmail('Новый вопрос с сайта legal-msk.ru')
        res.status(200).json(query)
    }
    catch (error) {
        console.log(error)
    }
}
// ---------------------------------------------
module.exports.update = async function (req, res) {
    try {
        const query = await Query.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    query: req.body.query,
                    phone: req.body.phone,
                    email: req.body.email,
                    status: req.body.status,
                    done: req.body.done,
                    history: req.body.history
                }
            },
            {returnOriginal: false })
        res.status(200).json(query)
    }
    catch (error) {
        console.log(error)
    }
}
// ---------------------------------------------------
module.exports.delete = async function (req, res) {
    try {
        await Query.remove({ _id: req.params._id })

        res.status(200).json({ message: 'Query deleted!' })
    }
    catch (error) {
        console.log(error)
    }
}


