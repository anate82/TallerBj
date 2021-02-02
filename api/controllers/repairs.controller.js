const carModel = require('../models/cars.model')
const repairModel = require('../models/repairs.model')
const jwt = require ('jsonwebtoken');
const usersModel = require('../models/users.model');
const { populate } = require('../models/cars.model');

function getAllRepairs(req, res) {
    repairModel
        .find()
        .then(repairs => {
            res.status(200).json(repairs)
        })
        .catch(err => {
            res.status(500).send('Repairs not found')
        })
}

function getRepairByCarId(req, res) {
    repairModel
        .find({car:req.params.carId})
        .populate('car')
        .then(repair => {
            res.status(200).json(repair)
        })
        .catch(err => {
            res.status(500).send('Repair not found')
        })
}

function getAllRepairsByUser(req, res) {
    repairModel
        .find({user:res.locals.user._id})
        .populate('car')
        .then(repairs =>{
            res.status(200).json(repairs)
        })
        .catch(err => {
            res.status(500).send('Repairs not found')
        })
}

function getRepairById(req, res) {
    repairModel
        .findOne({_id:req.params.repairId})
        .then(repair => {
            res.status(200).json(repair)
        })
        .catch(err => {
            res.status(500).send('Repair not found')
        })
}

function createRepair(req, res) {
    carModel
        .findOne({_id:req.body.carId})
        .then(car => {
            console.log(car)
            repairModel
                .create({
                    user:car.user,
                    car:car._id,
                    date_in: req.body.dateIn,
                    date_out: req.body.dateOut,
                    secure:req.body.secure
                })
                .then(newRepair => {
                    car.repairs.push(newRepair._id)
                    car.save(function (err) {
                        if(err) return res.status(500).send(err);
                        res.status(200).json(newRepair);
                    })
        
                })
                .catch(err => {
                    res.status(500).send('HOla')
                })
        })
        .catch(err => {
            res.status(500).send('Repair can not be created')
        })
}

function addBudgetRepair(req, res) {
    repairModel
        .findOne({_id:req.params.repairId})
        .then(repair => {
            repair.budget.push({
                date_create:req.body.date_create,
                type:req.body.type,
                description:req.body.description,
                pieces:req.body.pieces,
                hours_disas:req.body.hours_disas,
                hours_repare:req.body.hours_repare,
                paint:req.body.paint,
                auxiliary:req.body.auxiliary,
                price:req.body.price,
                accepted:req.body.accepted
            })
            repair.save(function (err) {
                if(err) return res.status(500).send(err);
                res.status(200).json(repair);
            })
        })
        .catch(err => {
            res.status(500).send('Budget can not be created')
        })
}

function addProccessRepair(req, res) {
    repairModel
        .findOne({_id:req.params.repairId})
        .then(repair => {
            if(res.locals.user.role === "admin"){
                repair.process_repair.push({
                    readed:false,
                    date_pro:Date.now().toString(),
                    comment_pro:req.body.comment,
                    date_client:Date.now(),
                    comment_client:"",
                    photo:""
                })
            } else {
                repair.process_repair.push({
                    readed:false,
                    date_pro:Date.now().toString(),
                    comment_pro:"",
                    date_client:Date.now().toString(),
                    comment_client:req.body.comment,
                    photo:""
                })
            }
            repair.save(function (err) {
                if(err) return res.status(500).send(err);
                res.status(200).json(repair);
            })
        })
        .catch(err => {
            res.status(500).send('Proccess repair can not be added')
        })
}

function updateRepair(req, res) {
    repairModel
        .findOneAndUpdate({_id:req.params.repairId}, req.body)
        .then(repair => {
            res.status(200).json(repair)
        })
        .catch(err => {
            res.status(500).send('Proccess repair can not be added')
        })
}

function deleteRepairId(req, res) {
    repairModel
        .findByIdAndRemove({_id: req.params.repairId})
        .then(repairDeleted => {
            console.log(repairDeleted)
            console.log('4'+repairDeleted.car)
            carModel
                .findOne({_id:repairDeleted.car})
                .then(car =>{
                    let i = car.repairs.indexOf(req.params.repairId)
                    car.repairs.splice(i,1);
                    car.save(function (err) {
                        if(err) return res.status(500).send(err);  
                        res.status(200).json(repairDeleted)                       
                    })
                })
                .catch(err => {
                    res.status(500).send('Repair can not be founded to be deleted')
                })
        })
        .catch(err => {
            res.status(500).send('Repair can not be deleted')
        })
}

function updateProcess(req, res) {
    repairModel
        .findOne({_id: req.params.repairId})
        .then(repair => {
            const processSelected = repair.process_repair.filter(process =>
                process._id == req.params.processId
            )
            processSelected[0].date_client = Date.now();
            processSelected[0].comment_client = req.body.comment;
            repair.save(function (err) {
                if(err) return res.status(500).send(err);
                res.status(200).json(repair)                           
            })
            
        })
        .catch(err => {
            res.status(500).send('Process can not be updated')
        })
}

function notifyReaded(req, res) {
    repairModel
        .findOne({_id: req.params.repairId})
        .then(repair => {
            const processSelected = repair.process_repair.filter(process =>
                process._id == req.params.processId
            )
            processSelected[0].readed = req.body.readed;
            repair.save(function (err) {
                if(err) return res.status(500).send(err);
                res.status(200).json(repair)                           
            })
        })
        .catch(err => {
            res.status(500).send('Notify can not be changed its state')
        })
}

function updateBudgetRepair(req, res) {
    repairModel
        .findOne({_id: req.params.repairId})
        .then(repair => {
            const budgetSelected = repair.budget.filter(budget =>
                budget._id == req.params.budgetId
            )
            budgetSelected[0].accepted = req.body.accepted;
            repair.save(function (err) {
                if(err) return res.status(500).send(err);
                res.status(200).json(repair)                           
            })
        })
        .catch(err => {
            res.status(500).send('Budget can not be updated')
        })
}

module.exports = {
    getAllRepairs,
    getAllRepairsByUser,
    getRepairByCarId,
    getRepairById,
    createRepair,
    addBudgetRepair,
    addProccessRepair,
    updateRepair,
    updateBudgetRepair,
    updateProcess,
    notifyReaded,
    deleteRepairId
}