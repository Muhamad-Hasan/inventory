const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const raw_material = new Schema({
    c_id: {
        type : mongoose.Types.ObjectId,
        ref : "customer"
    },
    p_id:{
        type : mongoose.Types.ObjectId,
        ref : "finish_product"
    
    },
    ctns : {
        type : Number
    },
    quantity : {
        type : Number
    },
    amount : {
        type : Number
    }
},{
    timestamps : true
    }
);


module.exports = mongoose.model('sale',raw_material );
