const router = require('express').Router()
const { isUser, isAdmin } = require('../utils') // Authenticated Route

const {
    getAllRepairs,
    getRepairById,
    getAllRepairsByUser,
    getRepairByCarId,
    createRepair,
    addBudgetRepair,
    addProccessRepair,
    updateRepair,
    updateProcess,
    deleteRepairId
} = require('../controllers/repairs.controller.js')

router
    .get('/', isAdmin, getAllRepairs)
    .get('/repairsUser', isUser, getAllRepairsByUser)
    .get('/repairCar/:carId', isUser, getRepairByCarId)
    .get('/:repairId', isUser, getRepairById)
    //obtengo del body el id del vehículo para crear una reparacion
    .post('/', isAdmin, createRepair)
    .put('/:repairId/addBudget', isUser,addBudgetRepair)
    .put('/:repairId/addProccess', isUser, addProccessRepair)
    .put('/:repairId', isAdmin, updateRepair)
    .put('/:repairId/process/:processId', isUser, updateProcess)
    .delete('/:repairId', isAdmin, deleteRepairId)


module.exports = router