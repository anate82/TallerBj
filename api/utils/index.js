const jwt = require ('jsonwebtoken')
const UserModel = require('../models/users.model')

function isUser(req, res, next) {
    if (!req.headers.token) {
        res.status(403).json({ error: 'No Token found' })
    } else {
        jwt.verify(req.headers.token, process.env.SECRET, (err, token) => {
            if (err) { res.status(403).json({ error: 'Token not valid' }) }
            UserModel
                .findOne({ email: token.email })
                .then(user => { // campo usuario role:admin//client
                    res.locals.user = user //guarda la informacion del perfil de usuario en res.locals.user
                    next()
                })
                .catch(err => res.json(err))
        })
    }
}

//Verifica el codigo del taller para poder hacer signup
//Si el codigo no es correcto no se puede registrar, esto es para que no se pueda dar de alta ningún usuario si no es cliente del taller.
function authNewUser(req, res, next) {
    if (req.body.code === process.env.CODETALLER){//Code:$2b$10$hfmadVOZEZAG8ekCgPgjMO1c2DQn0YzpNiXscVQKIv0PjWlN65vQS
      //verificacion codigo, si es correcto entonces permite registrarse
      next() 
    } else {
        res.send('Error code')
    }
}

function isAdmin (req, res, next) {
    if (!req.headers.token) {
      res.status(403).json({ error: 'No Token found' })
    } else {
        jwt.verify(req.headers.token, process.env.SECRET, (err, token) => {
            if (err) { res.status(403).json({ error: 'Token not valid' }) }
            UserModel
                .findOne({ email: token.email })
                .then(user => { // campo usuario role:admin//client
                    if (user.role !== "admin") {res.status(400).json({error:'User not permissiion'})}
                    else{
                         res.locals.user = user //guarda la informacion del perfil de usuario en res.locals.user
                        next()
                    }
                })
                .catch(err => res.json(err))
        })
    }
}

// Return HTTP error with details in JSON
function handleError (err, res) {
  return res.status(400).json(err)
}

module.exports = {
  isUser,
  isAdmin,
  authNewUser,
  handleError
}