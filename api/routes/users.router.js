const router = require('express').Router()

const { isUser, isAdmin } = require('../utils') // Authenticated Route

const {
    getAllUsers,
    getUserByEmail,
    deleteUserByEmail,
    updateUserData,
    updateUserPassword
} = require('../controllers/users.controller')

router
    .get('/', isAdmin, getAllUsers)
    .get('/me', isUser, getUserByEmail)
    .delete('/me', isAdmin, deleteUserByEmail) 
    .put('/me', isUser, updateUserData)
    .put('/me/password',isUser, updateUserPassword)

module.exports = router