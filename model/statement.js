const { number } = require('@hapi/joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoice = new Schema({
    c_id: {
        type :mongoose.Types.ObjectId,
        ref:"customer"
    },
    invoice_no:{
        type:String,
       
    },
    description: {
        type : String,
        
    },
    debit: {
        type : Number,
        default:0
    },
    credit : {
        type:Number,
        default:0
    },
    balance : {
        type:Number,
        default:0
    },
    deleted : {
        type : Boolean , 
        default:false
    },
    date:{
        type : Date,
        
    }
},{
    timestamps : true
    }
);


module.exports = mongoose.model('statement',invoice );
