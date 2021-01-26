const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is required']
    },
    surname:{
        type:String,
        required:[true, 'Surname is required']
    },
    dni:{
        type:String,
        required:[true, 'Dni is required'],
        unique:[true,'This is dni is registered']
    },
    phone:{
        type:Number,
        required:[true, 'Phone is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator(value){
                return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value))
            }
        },
        unique:[true,'This is email is registered']
    },
    alias:{
        type:String,
        required:false,
        default:'alias'
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type:String,
        enum:['admin','client'],
        required:false,
        default:'client'
    },
    array_cars:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'cars',
        required:false
    }],
    array_comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'comments',
        required:false
    }]
})

module.exports = mongoose.model('user',userSchema);