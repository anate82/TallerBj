const userModel = require ('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function signUp(req, res) {
    
    const encryptedPasswd = bcrypt.hashSync(req.body.password, 10)
    userModel
        .create({
            name: req.body.name,
            surname: req.body.surname,
            dni: req.body.dni,
            phone: req.body.phone,
            email: req.body.email,
            password: encryptedPasswd,
            role: req.body.role,
            alias: req.body.alias
        })
        .then(user => {
            const data = {name: user.name,surname:user.surname, email: user.email}
            const token = jwt.sign(data, process.env.SECRET)
            res.status(200).json({token: token, ...data})
        })
        .catch(err=> res.status(500).json(err))
}

function login(req, res) {
    userModel
        .findOne({email:req.body.email})
        .then(user => {
            if(!user) { return res.status(500).json({error: 'Email incorrecto'})}

            bcrypt.compare(req.body.password,user.password, (err, result) => {
                if(!result) { return res.status(500).json({error:'Password incorrecto'})}
                const user_data = {
                    name: user.name,
                    surname:user.surname,
                    email: req.body.email
                };
                const token = jwt.sign(user_data,process.env.SECRET,{expiresIn: '2d'})
                return res.status(200).json({token:token, ...user_data})
            })
        })
        .catch(err=> {
            res.status(500).json(err)
        })
}

module.exports = {
    signUp,
    login
}