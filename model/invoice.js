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
        required : true
    },
    bilty_amount: {
        type : Number,
        default:0
    },
    total_amount: {
        type : Number,
        default:0
    },
    grand_total : {
        type:Number,
        default:0
    },
    bilty_no : {
        type:String,
        
    },
    ctn_no : {
        type:Number,
    },
    deleted : {
        type : Boolean , 
        default:false
    },
    
    products:[{
        product_id: String ,
        ctns: Number,
        quantity : Number,
        name : String,
        size: String,
        color:String,
        tp:Number,
        scheme:String,
        net_tp:Number,
        disc : Number,
        price: Number,
        amount : Number,
        carton_size : Number

    }],
    note : {
        type : String,
        default:"None"
    },
    date:{
        type : Date,
        default:new Date()
    },
    balance: {
        type: Number,
        default:0
    },
    type : {
        type: String,
        default:"normal"
    },
    return_amount : {
        type :Number,
        default:0
    }
},{
    timestamps : true
    }
);


module.exports = mongoose.model('invoice',invoice );
