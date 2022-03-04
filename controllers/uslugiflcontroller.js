const Uslugifl = require('../models/uslugifl');

// --------------------------------------------------
module.exports.getAll = async function (req, res) {
    try {
        
        const querys = await
           Uslugifl.find();

        res.status(200).json(querys);
    }
    catch (error) {
        console.log(error);
        //res.status(error.status);
    }
} 

// --------------------------------------------------
module.exports.update = async function (req, res) {
    try {
        
        const querys = await
           Uslugifl.find();

        res.status(200).json(querys);
    }
    catch (error) {
        console.log(error);
        //res.status(error.status);
    }
}

// --------------------------------------------------
module.exports.create = async function (req, res) {
    try {
        
        const querys = await
           Uslugifl.find();

        res.status(200).json(querys);
    }
    catch (error) {
        console.log(error);
        //res.status(error.status);
    }
}

// --------------------------------------------------
module.exports.getbyId = async function (req, res) {
    try {
        
        const querys = await
           Uslugifl.find();

        res.status(200).json(querys);
    }
    catch (error) {
        console.log(error);
        res.status(404);
    }
}