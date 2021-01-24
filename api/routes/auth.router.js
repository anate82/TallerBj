const router = require ('express').Router();
const {signUp,login} = require ('../controllers/auth.controller');
const { authUser, authAdmin, authNewUser } = require('../utils') // Authenticated Route

router
    //Puede crear un usuario nuevo un cliente pero con un codigo facilitado por el taller, por eso necesita autenticarse con authNewUser
    .post('/signup', authNewUser,signUp) 
    .post('/login',login)


    
module.exports = router;