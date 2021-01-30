const router = require('express').Router()

const { isUser, isAdmin } = require('../utils') // Authenticated Route

const {
    getAllUsers,
    getUserById,
    getAllCarsOfUser,
    deleteUserByEmail,
    updateUserData,
    updateUserPassword
} = require('../controllers/users.controller')

router
    .get('/', isAdmin, getAllUsers)
    .get('/me', isUser, getUserById)
    .get('/me/allCars', isUser, getAllCarsOfUser)
    .delete('/me', isAdmin, deleteUserByEmail) 
    .put('/me', isUser, updateUserData)
    .put('/me/password',isUser, updateUserPassword)

module.exports = router