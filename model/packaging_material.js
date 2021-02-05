const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const raw_material = new Schema({
    name: {
        type :String,
        required : true
    },
    description:{
        type:String,
    },
    stock : {
        type : Number,
       
    },
    carton_size : {
        type : Number,
       
    },
    used: {
        type : Number,
        default:0
    },
    deleted : {
        type : Boolean , 
        default:false
    },
    date : {
        type : Date,

    },
    history: [{
        date : Date,
        quantity : Number,
        action : String
    }]
    
},{
    timestamps : true
    }
);


module.exports = mongoose.model('packaging_material',raw_material );
