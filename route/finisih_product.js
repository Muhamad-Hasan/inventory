const express = require("express");
const Joi = require('@hapi/joi');
const Raw = require("../model/finish_product");
// const Sale  = require("../model/sale")
const router = express.Router();


router.post("/" , async(req , res)=>{
    console.log("data" , req.body);
    const data = req.body;
    const schema = Joi.object({
       name : Joi.string().required(),
       description : Joi.string().allow(""),
       stock : Joi.number().required(),
       carton_size: Joi.number().required(),
       used : Joi.number(),
       date : Joi.string().required(),
       south_price : Joi.number().required(),
       product_id : Joi.string().required(),
       product_size :Joi.string().required(),  
       product_color :Joi.string().required()  

    })
    try{
        console.log("add" , data);
        let value = await schema.validateAsync(data);
        if(!value.error){
            console.log("product" , data);
            let raw = await Raw.findOne({name : data.name , product_id : data.product_id  , product_size : data.product_size , product_color : data.product_color });
            console.log("rwa" , raw);
            if(raw && raw.name == data.name  && raw.product_id == data.product_id && raw.product_size == raw.product_size && raw.product_color == data.product_color){
                return res.status(202).json(`${data.name} is already Exists`);
                
            }
            
            else{
                data["history"] = [{
                    date : data.date,
                    quantity : data.stock,
                    action : "add"
                }]
                let update  = new Raw(data);
                update.save();
                return res.status(200).json(update);
            }
        }
      
    }catch(err){
        console.log(err)
        res.status(400).json(err)
    }
})

router.post("/sale" , async(req , res)=>{
    console.log("sale" , req.body);
    const data = req.body;
    const schema =await Joi.object({
        c_id : Joi.string(),
        p_id : Joi.string().required(),
        from: Joi.string().required(),
        to : Joi.string().required()
    })
    
    try{
        let value = await schema.validateAsync(data);
        if(!value.error){
            console.log("dates toucj" , req.body);
            let from  = new Date(req.body.from);
            let to  = new Date(req.body.to);
            let fromDate = new Date(from.getFullYear() , from.getMonth() , from.getDate())
            let endDate = new Date(to.getFullYear() , to.getMonth() , to.getDate()+1)
            console.log('dates' , fromDate , endDate);
           
            
            let sale =data.c_id ? await Sale.find({p_id:data.p_id ,c_id : data.c_id ,  "createdAt" : {$gte : new Date(fromDate) , $lte : new Date(endDate)}}).populate("c_id").populate("p_id"):
            await Sale.find({p_id:data.p_id ,"createdAt" : {$gte : new Date(fromDate) , $lte : new Date(endDate)}}).populate("c_id").populate("p_id");
            console.log("sales check" , sale);
            res.status(200).json(sale);

        }
    }catch(err){
        console.log('err' , err);
        res.status(400).json(err);

    }
})


router.get("/" , async(req , res)=>{
    let data = req.query;
    try{
        if(data.name){
            let raw = await Raw.find({name : {$regex : data.name} , deleted : false});
            res.status(200).json(raw)
    
        }else{
            let raw = await Raw.find({deleted : false});
            res.status(200).json(raw)

        }
    }catch(err){
        console.log(err);
        res.status(400).json(err)
    }
})


router.post('/use' , async(req , res)=>{
    const data = req.body;
    const schema = Joi.object({
        product_id : Joi.string().required(),
        used : Joi.number().required()
    });
    try{
        let value = await schema.validate(data);
        if(!value.error){
            let raw = await Raw.findById(data.product_id);
            console.log("raw" , data.used);
            raw["stock"] = parseFloat(raw.stock) + parseFloat(data.used);
            raw["history"] = [...raw.history , {
                date : new Date(),
                quantity : data.used,
               
            }];
            raw.save()
            console.log("raw" , raw);
            res.status(200).json(raw);
        }
    }catch(err){
        console.log(err);
        res.status(400).json(err.message);
    }
});



router.put("/:id" , async(req , res)=>{
    let data = req.params;
    try{
        if(data.id){
            let raw = await Raw.findByIdAndUpdate(data.id , {
                $set : req.body
            } , {new : true})
            res.status(200).json(raw)

        }
    }catch(err){
        console.log(err);
        res.status(400).json(err)
    }
})

router.delete("/:id" , async(req , res)=>{
    let data = req.params;
    try{
        let raw = await Raw.findByIdAndUpdate(data.id , {
            $set : {deleted : true}
        } , {new : true});
        if(raw){
            return res.status(200).json(raw);
        }
    }catch(err){
        res.status(400).json(err)
    }
})

router.delete("/:id" , async(req , res)=>{
    let data = req.params;
    try{
        let raw = await Raw.findByIdAndUpdate(data.id , {
            $set : {deleted : true}
        } , {new : true});
        if(raw){
            return res.status(200).json(raw);
        }
    }catch(err){
        res.status(400).json(err)
    }
})

router.delete("/:id/:q_id" , async(req , res)=>{
    let data = req.params;
    try{
        let raw = await Raw.findById(data.id);
        let history = raw.history.filter(f => f._id  == data.q_id )
        raw["history"] = raw.history.filter(f => f._id  != data.q_id )
        console.log("history" , history[0] , raw.stock);
        if(raw.stock >= history[0].quantity ){
            raw["stock"] = raw.stock - history[0].quantity;
        
            raw.save();
            if(raw){
                return res.status(200).json(raw);
            }
        }else{
            return res.status(201).json("Cannot delete this entry")
        }
        
    }catch(err){
        console.log("err", err);
        res.status(400).json(err)
    }
})


router.get("/:id" , async(req , res)=>{
    let data = req.params;
    try{
        let raw = await Raw.findById(data.id);
        if(raw){
            return res.status(200).json(raw);
        }
    }catch(err){
        res.status(400).json(err)
    }
})


router.post('/use' , async(req , res)=>{
    const data = req.body;
    const schema = Joi.object({
        product_id : Joi.string().required(),
        used : Joi.number().required()
    });
    try{
        let value = await schema.validate(data);
        if(!value.error){
            let raw = await Raw.findByIdAndUpdate(data.product_id , {
                $inc : {stock : -data.used},
                $inc : {used : data.used},
                $push : {history : {
                    date : data.date,
                    quantity : data.stock,
                    action : "use"
                }},
            });
            res.status(200).json(raw);
        }
    }catch(err){
        res.status(400).json(err.message);
    }
});


module.exports = router;

