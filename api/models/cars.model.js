const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:false
    },
    repairs:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'repairs',
            required:false
    }],
    brand:{
        type:String,
        required:true
    },
    car_model:{
        type:String,
        required:true
    },
    frame_number:{
        type:String,
        unique:[true,'This is Frame number is registered'],
        length:17,
        required:true
    },
    reg_veh:{
        type:String,
        unique:[true,'This is Registration number is registered'],
        required:true
    },
    kilometers:{
        type:Number,
        required:false
    },
    year:{
        type:Number,
        required:false,
        length:4
    },
    ref_paint:[{
        ref_color:{
            type:String
        },
        variant:{
            type:String
        }
    }]

})

module.exports = mongoose.model('cars',carSchema);