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
    updateBudgetRepair,
    updateProcess,
    notifyReaded,
    deleteRepairId
} = require('../controllers/repairs.controller.js')

router
    .get('/', isAdmin, getAllRepairs)
    .get('/repairsUser', isUser, getAllRepairsByUser)
    .get('/repairCar/:carId', isUser, getRepairByCarId)
    .get('/:repairId', isUser, getRepairById)
    //obtengo del body el id del vehículo para crear una reparacion
    .post('/', isAdmin, createRepair)
    .put('/:repairId', isAdmin, updateRepair)
    .put('/:repairId/addBudget', isUser,addBudgetRepair)
    .put('/:repairId/addProccess', isUser, addProccessRepair)
    .put('/:repairId/updateBudget/:budgetId', isUser, updateBudgetRepair)
    .put('/:repairId/process/:processId', isUser, updateProcess)
    .put('/:repairId/notifyReaded/:processId/', isUser, notifyReaded)
    .delete('/:repairId', isAdmin, deleteRepairId)


module.exports = router