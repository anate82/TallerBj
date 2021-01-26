const router = require('express').Router()

const { isUser, isAdmin } = require('../utils') // Authenticated Route

const {
    getAllUsers,
    getUserByEmail,
    getAllCarsOfUser,
    getCarOfUser,
   // getAllRepairsOfAUser,
    addNewCar,
    deleteUserByEmail,
    updateUserData,
    updateUserPassword,
    updateCarOfUser
} = require('../controllers/users.controller')

router
    .get('/', isAdmin, getAllUsers)
    .get('/me', isUser, getUserByEmail)
    .delete('/me', isAdmin, deleteUserByEmail) 
    .put('/me', isUser, updateUserData)
    .put('/me/password',isUser, updateUserPassword)
    
    .get('/me/cars', isUser, getAllCarsOfUser)
    .post('/me/cars',isUser,addNewCar) 
    .get('/me/cars/:carId', isUser, getCarOfUser) 
    //.get('/me/cars/:carId/repairs', isUser, getAllRepairsOfAUser) //Muestra todas las reparaciones para un vehículo determinado y un usaurio concreto
    .put('/me/cars/:carId', isUser, updateCarOfUser)

module.exports = router