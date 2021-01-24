const userModel = require('../models/users.model')
const {authUser, authAdmin, authNewUser, handleError} = require('../utils')

function getAllUsers(req, res) {
    userModel
        .find()
        .then(response => res.json(response))
        .catch((err) => handleError(err, res))
}

function getUserById(req, res) {
    userModel
        .findById(res.locals.id)
        .then(response => {
            res.json(response)
        })
        .catch((err) => handleError(err, res))
}

function deleteUserById (req, res) {
    UserModel
      .remove({_id: res.locals.id })
      .then(response => res.json(response))
      .catch(err => handleError(err, res))
  }
  
function updateUser (req, res) {
    UserModel
      .findByIdAndUpdate(res.locals.id, req.body, {
        new: true,
        runValidators: true
      })
      .then(response => res.json(response))
      .catch((err) => handleError(err, res))
}

module.exports = {
    getAllUsers,
    getUserById,
    deleteUserById,
    updateUser
}