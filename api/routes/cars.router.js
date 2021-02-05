const router = require('express').Router()
const { isUser, isAdmin } = require('../utils') // Authenticated Route

const {
    getAllCars,
    getCarById,
    deleteCarById,
    createNewCar,
    createCarByEmail,
    updateCarById
} = require('../controllers/cars.controller.js')


router
    .get('/', isAdmin, getAllCars)
    .get('/:carId', isUser, getCarById)
    .post('/', isUser, createNewCar)
    .post('/:email', isAdmin, createCarByEmail)
    .put('/:carId', isUser, updateCarById)
    //Busca el usuario que tenga el vehículo asociado, lo elimina y luego elimina el vehículo
    .delete('/:carId', isAdmin, deleteCarById)
   

    module.exports = router