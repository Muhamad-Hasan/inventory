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
    
    deleted : {
        type : Boolean , 
        default:false
    },
    date : {
        type : Date,

    },
    history: [{
        date : Date,
        action : String
    }]
    
},{
    timestamps : true
    }
);


module.exports = mongoose.model('raw_finish',raw_material );
