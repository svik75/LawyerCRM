const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/key')

// ------------------------------------------------------------------
module.exports.login = async function (req, res) {
    
    const email = typeof(req.body.email) == 'string' && req.body.email.length>0 ? req.body.email : '';
    const password = typeof(req.body.password) == 'string' && req.body.password.length>0 ? req.body.password : '';

    const candidate = await User.findOne({ 'email': email })
    if (candidate) {
        const passResult = bcrypt.compareSync(password, candidate.password)
        if (passResult) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate.id
            },keys.jwt, {expiresIn: '360s'} )
            res.status(200).json({ token: `Bearer ${token}`})
        } else {
            res.status(401).json({message: 'Неверный пароль! Попытайтесь снова.'})
        }

    } else {
        res.status(404).json({message: 'Пользователь с таким email не найден!'})
    }

}
// -----------------------------------------------------------------
module.exports.register = async function (req, res) {

    const candidate = await User.findOne({ email: req.body.email })
    // console.log(req.body.email )
    if (candidate) {
        res.status(409).json({message: 'Пользователь с таким email уже зарегистрирован!'})
    } else {
        const salt = bcrypt.genSaltSync(10)
        const psw = req.body.password
        const user = new User({
         email: req.body.email,
         password: bcrypt.hashSync(psw, salt),
         name: req.body.name,
         phone: req.body.phone 
        })
        try {
            await user.save()
            res.status(201).json(user)
            console.log('Новый пользователь создан!')
            
        } catch (error) {
            console.log(error)
        }
    }
}
// ------------------------------------------------------------------
module.exports.update = async function (req, res) {
    
    try {
        console.log('patch user:'+req.body.email);
        const salt = bcrypt.genSaltSync(10);
        const psw = req.body.password;
    const newUser = await User.findOneAndUpdate({email: req.body.email},{
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: bcrypt.hashSync(psw, salt)
    })
    res.status(200).json(newUser)}
    catch(error) {
        console.log(error)
    }
    
}
// ----------------------------------------------
module.exports.updateAdmin = async function (req, res) {
    
    try { console.log(req.body.email);
    const newUser = await User.findOneAndUpdate({email: req.body.email},{
        isAdmin: req.body.isAdmin
    })
    res.status(200).json(newUser)
}
    catch(error) {
        console.log(error)
    }
    
}
// ---------------------------------------------------
module.exports.delete = async function (req, res) {
    try {
        
        const cat = await User.findOneAndDelete({email: req.params.email});
        res.status(200).json(cat);
        console.log(cat);
    } catch (error) {
        console.log(error);
    }
}
// ---------------------------------------------------
module.exports.getByEmail = async function (req, res) {
    try {
        var email = typeof(req.params.email) == 'string' && req.params.email.length > 0 ? req.params.email : null;
        if(email) {
           const cat = await User.findOne({email: email});
        res.status(200).json(cat); 
        } else {
            res.status(404);
        }
        
    } catch (error) {
        console.log(error);
    }
}
// ---------------------------------------------------
module.exports.getAll = async function (req, res) {
    try {
        const cat = await User.find();
        res.status(200).json(cat);
    } catch (error) {
        console.log(error);
    }
}