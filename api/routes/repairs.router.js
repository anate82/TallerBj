const router = require('express').Router()
const { isUser, isAdmin } = require('../utils') // Authenticated Route

const {
    getAllRepairs,
    getRepairById,
    createRepair,
    addBudgetRepair,
    addProccessRepair,
    updateRepair,
    deleteRepairId
} = require('../controllers/repairs.controller.js')

router
    .get('/', isAdmin, getAllRepairs)
    .get('/:repairId', isUser, getRepairById)
    //obtengo del body el id del vehículo para crear una reparacion
    .post('/', isAdmin, createRepair)
    .put('/:repairId/addBudget', isUser,addBudgetRepair)
    .put('/:repairId/addProccess', isUser, addProccessRepair)
    .put('/:repairId', isAdmin, updateRepair)
    .delete('/:repairId', isAdmin, deleteRepairId)


module.exports = router