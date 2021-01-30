const userModel = require('../models/users.model')
const carModel = require('../models/cars.model')
const repairModel = require('../models/repairs.model')
const jwt = require ('jsonwebtoken')
const {authUser, authAdmin, authNewUser, handleError} = require('../utils')
const bcrypt = require('bcrypt');


//Obtiene todos los usuarios, esto solo lo puede hacer el usuario administrador
function getAllUsers(req, res) {
    userModel
        .find()
        .then(response => res.json(response))
        .catch((err) => handleError(err, res))
}

//Obtiene los datos de un usuario, buscados por email
function getUserById(req, res) {
    userModel
        .findOne({_id:res.locals.user._id})
        .then(user => {
            res.json({
                name:user.name,
                surname:user.surname,
                dni:user.dni,
                phone:user.phone,
                email:user.email,
                alias:user.alias,
                password:user.password,
                cars:user.cars,
                comments:user.comments
            })
        })
        .catch((err) => handleError(err, res))
}
/*
//Obtiene todos los vehículos de un usuario determinado

function getAllCarsOfUser(req, res) {
    userModel
        .findOne({email:res.locals.user.email})
        .populate('array_cars')
        .then(user => {
            //Se envian todos los campos menos el id de usuario
            const filterCars = user.array_cars.map(car => {
                const container = {}
                container["repairs"]=car.repairs;
                container["_id"]=car._id;
                container["brand"]=car.brand;
                container["car_model"]=car.car_model;
                container["frame_number"]=car.frame_number;
                container["reg_veh"] = car.reg_veh;
                container["kilometers"] = car.kilometers;
                container["year"] = car.year;
                container["ref_paint"] = car.ref_paint;
                return container;
            })
            res.status(200).json(filterCars);
        })
        .catch((err) => handleError(err, res))
}

function getCarOfUser(req, res) {
    userModel
        .findOne({email:res.locals.user.email})
        .populate('array_cars')
        .then(user => {
            let carSelect = {}
            user.array_cars.forEach(car => {
                if (car._id == req.params.carId){
                    carSelect = car;
                 }
            });
            if(Object.entries(carSelect).length>0){
                res.status(200).json({
                repairs:carSelect.repairs,
                _id:carSelect._id,
                brand:carSelect.brand,
                car_model:carSelect.car_model,
                frame_number:carSelect.frame_number,
                reg_veh:carSelect.reg_veh,
                kilometers:carSelect.kilometers,
                year:carSelect.year});
            }else{
                res.status(400).json({Error: "CarId is not found"})
            }
        })
        .catch((err) => handleError(err, res)).catch((err) => handleError(err, res))
}


function getAllRepairsOfAUser(req, res) {
    userModel
        .findOne({email:res.locals.user.email})
        .then(user => {
            user.array_cars
        })
        .catch((err) => handleError(err, res))
}

//Crea un nuevo coche para un usuario determinado

function addNewCar(req, res) {
    userModel
        .findOne({email:res.locals.user.email})
        .then(user => {
            carModel
                .create({
                    user: user._id,
                    brand: req.body.brand,
                    car_model: req.body.car_model,
                    frame_number: req.body.frame_number,
                    reg_veh: req.body.reg_veh,
                    kilometers: req.body.kilometers,
                    year: req.body.year
                })
                .then(car => {
                    user.array_cars.push(car._id);
                    user.save(function (err) {
                        if(err) { 
                            handleError(err, res)
                        } else{
                            res.status(200).json({
                                repairs:car.repairs,
                                _id:car._id,
                                brand:car.brand,
                                car_model:car.car_model,
                                frame_number:car.frame_number,
                                reg_veh:car.reg_veh,
                                kilometers:car.kilometers,
                                year:car.year
                            });    
                        }
                    })
                })
                .catch((err) => handleError(err, res))
        })
        .catch((err) => handleError(err, res))
}*/

//Elimina un usuario (solo lo puede hacer el usuario admin), y se elimina pasando por el body el email a eliminar
function deleteUserByEmail (req, res) {
    userModel
      .deleteOne({email: req.body.email })
      .then(userDeleted => res.json(userDeleted))
      .catch(err => handleError(err, res))
  }
  
//Actualiza la informacion personal de un usuario pero no el campo contraseña
function updateUserData (req, res) {
    userModel
        .findOneAndUpdate({_id:res.locals.user._id}, {
            name: req.body.name,
            surname: req.body.surname,
            dni: req.body.dni,
            phone: req.body.phone,
            email: req.body.email
        })
        .then(userUpdate => {
            res.status(200).json({
               name:userUpdate.name,
               surname:userUpdate.surname})
        })
        .catch((err) => handleError(err, res))
}

//Actualiza el campo contraseña de la base de datos
function updateUserPassword (req, res) {
    const encryptedPasswd = bcrypt.hashSync(req.body.password, 10)
    userModel
        .findOneAndUpdate({_id:res.locals.user._id}, {
            password: encryptedPasswd
        })
        .then(userUpdate => {
            res.status(200).json({
               name:userUpdate.name,
               surname:userUpdate.surname})
        })
        .catch((err) => handleError(err, res))
}
/*
function updateCarOfUser(req, res) {
    userModel
        .findOne({email:res.locals.user.email})
        .then(user => {
            carModel
                .findOneAndUpdate({_id:req.params.carId},{
                    brand:req.body.brand,
                    car_model:req.body.car_model,
                    frame_number:req.body.frame_number,
                    reg_veh:req.body.reg_veh,
                    kilometers:req.body.kilometers,
                    year:req.body.year
                })
                .then(car => {
                     res.status(200).json({
                        reg_veh:car.reg_veh,
                        brand:car.brand,
                        car_model:car.car_model})
                })
                .catch((err) => handleError(err, res))
        })
        .catch((err) => handleError(err, res))
}*/
function getAllCarsOfUser(req, res) {
    userModel
        .findOne({_id:res.locals.user._id})
        .populate('array_cars')
        .then(user => {
            //Se envian todos los campos menos el id de usuario
            const filterCars = user.array_cars.map(car => {
                const container = {}
                container["repairs"]=car.repairs;
                container["_id"]=car._id;
                container["brand"]=car.brand;
                container["car_model"]=car.car_model;
                container["frame_number"]=car.frame_number;
                container["reg_veh"] = car.reg_veh;
                container["kilometers"] = car.kilometers;
                container["year"] = car.year;
                container["ref_paint"] = car.ref_paint;
                return container;
            })
            res.status(200).json(filterCars);
        })
        .catch((err) => handleError(err, res))
}


module.exports = {
    getAllUsers,
    getUserById,
    getAllCarsOfUser,
    deleteUserByEmail,
    updateUserData,
    updateUserPassword
}