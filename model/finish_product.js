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
    carton_size: {
        type: Number
    },
    north_size: {
        type: Number
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
       
    }],
    south_price : {
        type : Number
    },
    north_price : {
        type : Number
    },
    
    product_id : {
        type : String
    },
    product_size : {
        type : String
    },
    product_color : {
        type : String
    },
    
},{
    timestamps : true
    }
);


module.exports = mongoose.model('finish_product',raw_material );
