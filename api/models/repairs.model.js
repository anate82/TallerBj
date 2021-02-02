const mongoose = require('mongoose')

const repairSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:false
    },
    car:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'cars',
        required:false
    },
    budget:[{
        //fecha de creacion del presupuesto
        date_create:{
            type:Date
        },
        //si es para seguros o para particulares
        type:{ 
            type:String
        },
        description:{
            type:String
        },
        pieces:[{
            type:String
        }],
        hours_disas:{
            type:Number
        },
        hours_repare:{
            type:Number
        },
        paint:{
            type:Number
        },
        auxiliary:{
            type:String
        },
        price:{
            type:Number
        },
        accepted:{
            type:Boolean
        }
    }],
    date_in:{
        type:String,
        required:true
    },
    date_out:{
        type:String,
        required:false
    },
    secure:{
        type:String,
        required:true
    },
    process_repair:[{
        readed:Boolean,
        date_pro:Date,
        comment_pro:String,
        date_client:Date,
        comment_client:String,
        photo:String
    }]
})

module.exports = mongoose.model('repairs', repairSchema);