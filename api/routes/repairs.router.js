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
    //Actualiza los datos de la reparacion que se pasen por el body
    .put('/:repairId', isAdmin, updateRepair)
    .put('/:repairId/addBudget', isAdmin,addBudgetRepair)
    .put('/:repairId/updateBudget/:budgetId', isUser, updateBudgetRepair)
    .put('/:repairId/addProccess', isUser, addProccessRepair)
    .put('/:repairId/process/:processId', isUser, updateProcess)
    .put('/:repairId/notifyReaded/:processId/', isUser, notifyReaded)
    .delete('/:repairId', isAdmin, deleteRepairId)


module.exports = router