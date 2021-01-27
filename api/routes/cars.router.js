const router = require('express').Router()
const { isUser, isAdmin } = require('../utils') // Authenticated Route

const {
    getAllCars,
    getCarById,
    deleteCarById,
    createNewCar,
    updateCarById
} = require('../controllers/cars.controller.js')


router
    .get('/', isAdmin, getAllCars)
    .post('/', isUser, createNewCar)
    .get('/:carId', isUser, getCarById)
    //Busca el usuario que tenga el vehículo asociado, lo elimina y luego elimina el vehículo
    .delete('/:carId', isAdmin, deleteCarById)
    .put('/:carId', isUser, updateCarById)
    

    module.exports = router