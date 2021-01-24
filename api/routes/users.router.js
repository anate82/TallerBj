const router = require('express').Router()

const { authUser, authAdmin, authNewUser } = require('../utils') // Authenticated Route

const {
    getAllUsers,
    getUserById,
    deleteUserById,
    updateUser
} = require('../controllers/users.controller')

router
    .get('/', authAdmin, getAllUsers)//Ver todos los usuarios solo lo puede hacer el administrador
    .get('/me', authUser, getUserById) //el usuario puede ver su perfil
    .delete('/me', authAdmin,deleteUserById) //Eliminar un usuario solo lo puede hacer el administrador
    .put('/me', authUser, updateUser) //Lo puede hacer el cliente y el administrador

module.exports = router