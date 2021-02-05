const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customer = new Schema({
    name: {
        type :String,
        required : true
    },
    c_id:{
        type:String,
        required : true
    },
    address: {
        type : String,
       
    },
    phone: {
        type: String
    },
    balance: {
        type : Number,
        default:0
    },
    discount: {
        type : Number,
        default:0
    },
    deleted : {
        type : Boolean , 
        default:false
    },
    remarks:{
        type: String
    }
    
},{
    timestamps : true
    }
);


module.exports = mongoose.model('customer',customer );
