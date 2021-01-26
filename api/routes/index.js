const router = require('express').Router()

const usersRouter = require('./users.router')
const authRouter = require('./auth.router')
const carRouter = require('./cars.router')
const repairsRouter = require('./repairs.router')

router
    .use('/users', usersRouter)
    .use('/auth', authRouter)
    .use('/cars', carRouter)
    .use('/repairs', repairsRouter)

module.exports = router