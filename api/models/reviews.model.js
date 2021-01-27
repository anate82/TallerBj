const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:false
    },
    date_create:{
        type:Date,
        default:Date.now(),
        require:false
    },
    comment:{
        type:String,
        maxlength:256,
        required:[true,"Comments is required"]
    },
    public:{
        type:Boolean,
        default:false
    },
    puntuation:{
        type:Number,
        required:[true,"Puntuation is required"]
    }

})

module.exports = mongoose.model('review',reviewSchema);