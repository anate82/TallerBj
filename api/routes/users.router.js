const router = require('express').Router()

const { isUser, isAdmin } = require('../utils') // Authenticated Route

const {
    getAllUsers,
    getUserById,
    getAllCarsOfUser,
    deleteUserByEmail,
    updateUserData,
    sendEmail,
    updateUserPassword
} = require('../controllers/users.controller')

router
    .get('/', isAdmin, getAllUsers)
    .get('/me', isUser, getUserById)
    .get('/me/allCars', isUser, getAllCarsOfUser)
    .delete('/me', isAdmin, deleteUserByEmail) 
    .put('/me', isUser, updateUserData)
    .post('/sendEmail', sendEmail)
    .put('/me/password',isUser, updateUserPassword)

module.exports = router