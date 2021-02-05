const router = require('express').Router()

const { isUser, isAdmin } = require('../utils') // Authenticated Route

const {
    getAllUsers,
    getUserById,
    getAllCarsOfUser,
    deleteUserById,
    updateUserData,
    sendEmail,
    updateUserPassword
} = require('../controllers/users.controller')

router
    .get('/', isAdmin, getAllUsers)
    .get('/me', isUser, getUserById)
    .get('/me/allCars', isUser, getAllCarsOfUser)
    .put('/me', isUser, updateUserData)
    .put('/me/password',isUser, updateUserPassword)
    .post('/sendEmail', sendEmail)
    .delete('/me/deleteUser', isAdmin, deleteUserById) 
    

module.exports = router