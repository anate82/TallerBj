const carModel = require('../models/cars.model')
const repairModel = require('../models/repairs.model')
const jwt = require ('jsonwebtoken');
const usersModel = require('../models/users.model');


function getAllCars(req, res){
    carModel
        .find()
        .then(allCars => {
            res.status(200).json(allCars);
        })
        .catch(err => {
            res.status(500).send('Cars not found')
        })
}

function getCarById(req, res){
    carModel
        .findOne({_id:req.params.carId})
        .then(car => {
            res.status(200).json(car)
        })
        .catch(err => {
            res.status(500).send('Car not found')
        })
}


//Busca el usuario que tenga el vehículo asociado, lo elimina y luego elimina el vehículo
function deleteCarById(req, res) {
    carModel
        .findOne({_id:req.params.carId})
        .then(carFound => {
            usersModel
                .findOne({_id:carFound.user})
                .then(user => {
                    var i = user.array_cars.indexOf(req.params.carId)
                    user.array_cars.splice(i,1);
                    user.save(function (err) {
                        if(err) return res.status(500).send(err);
                        carModel
                            .deleteOne({_id: req.params.carId})
                            .then(carDeleted => {
                                res.status(200).json(carDeleted)
                            })
                            .catch(err => {
                                res.status(500).send('Car can not be deleted')
                            })
                    })
                })
        })
        .catch(err => {
            res.status(500).send('Car not deleted')
        })
}

function getAllRepairsByCar(req, res) {
    carModel
        .findOne({_id:req.params.carId})
        .populate('repairs')
        .then(car => {
            res.status(200).json(car.repairs)
        })
        .catch(err => {
            res.status(500).send('Repairs not found')
        })
}

function createNewCar(req, res) {
    carModel
        .create({
            user: res.locals.user._id,
            brand: req.body.brand,
            car_model: req.body.car_model,
            frame_number: req.body.frame_number,
            reg_veh: req.body.reg_veh,
            kilometers: req.body.kilometers,
            year: req.body.year
        })
        .then(newCar => {
            res.status(200).json(newCar)
            usersModel
                .findById(res.locals.user._id)
                .then(user => {
                    user.array_cars.push(newCar)
                    user.save(function (err){
                        if(err) return res.status(500).send(err);
                    })
                })
                .catch(err => {
                    res.status(500).send('Car can not be added')
                })
        })
        .catch(err => {
            res.status(500).send('Car can not be created')
        })
}

function updateCarById(req, res){
    carModel
        .findOneAndUpdate({_id:req.params.carId}, {
            brand: req.body.brand,
            car_model: req.body.car_model,
            frame_number: req.body.frame_number,
            reg_veh: req.body.reg_veh,
            kilometers: req.body.kilometers,
            year: req.body.year,
            ref_paint:req.body.ref_paint
        })
        .then(carUpdated => {
            res.status(200).json(carUpdated)
        })
        .catch(err => {
            res.status(500).send('Car can not be created')
        })
}

module.exports = {
    getAllCars,
    getCarById,
    deleteCarById,
    getAllRepairsByCar,
    createNewCar,
    updateCarById
}