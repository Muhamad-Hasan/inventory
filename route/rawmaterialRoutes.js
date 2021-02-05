const express = require("express");
const Joi = require('@hapi/joi');
const Raw = require("../model/raw_material");
const router = express.Router();


router.post("/" , async(req , res)=>{
    const data = req.body;
    const schema = Joi.object({
       name : Joi.string().required(),
       description : Joi.string().allow(""),
       stock : Joi.number().required(),
       used : Joi.number(),
       date : Joi.string().required() 

    })
    try{
        let value = await schema.validateAsync(data);
        if(!value.error){
            let raw = await Raw.findOne({name : data.name});
            console.log("rwa" , raw);
            if(raw){
                let update = await Raw.findByIdAndUpdate( raw._id, {
                    $inc : {stock : data.stock},
                    $set : {date : data.date},
                    $push : {history : {
                        date : data.date,
                        quantity : data.stock,
                        action : "add"
                    }},
                } , {new : true});
                console.log("update" , update);
                return res.status(200).json(update);
                
            }else{
                data["history"] = [{
                    date : data.date,
                    quantity : data.stock,
                    action: "add"
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




router.get("/" , async(req , res)=>{
    let data = req.query;
    try{
        if(data.name){
            let raw = await Raw.find({name : {$regex : data.name} , deleted : false});
            res.status(200).json(raw)
    
        }else{
            let raw = await Raw.find({deleted : false});
            console.log("raw" , raw);
            res.status(200).json(raw)

        }
    }catch(err){
        console.log(err);
        res.status(400).json(err)
    }
})

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


router.get("/:id" , async(req , res)=>{
    let data = req.params;
    try{
        if(data.id){
            let raw = await Raw.findById(data.id)
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
            console.log(raw);
            return res.status(200).json(raw);
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
            let raw = await Raw.findById(data.product_id)
            raw["stock"] = raw.stock >= data.used ? raw.stock - data.used :  res.status(400).json("Not have enought anount");
            raw["used"] = raw.used + data.used;
            raw["history"] = [...raw.history , {
                date : new Date(),
                    quantity : data.used,
                    action : "use"
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



// router.post("/", Upload.array("images" , 5) , async(req , res)=>{
//     const data = req.body;
//     const schema = Joi.object({
//         title : Joi.string().required(),
//         description :Joi.string(),
//         images:Joi.array(),
//         user_id : Joi.string().required(),
//         tags : Joi.array(),
//         city: Joi.string().required().lowercase(),
//         state : Joi.string().required().lowercase(),
//         price : Joi.number(), 
//         category: Joi.string().required().lowercase(),
//         sub_category : Joi.string().required().lowercase(),
//         path:Joi.string()
//     })
//     try{
//         let value = await schema.validateAsync(data);
//         if(!value.error){
//             console.log("images" , req.body)
//             let images = [];
//             if(req.files){
//                 console.log("fiels" , req.files)
//                 let file = req.files;
//                 let images = []
//                 file.map(text=>{
//                     images =[...images  , text.location]
//                 })
//                 data["images"] = images
//             }else{
//                 data["images"] = data.images
//             }
//             let adv = new Adv(data);
//             console.log("adv" , adv)
//             let tag_id = []
//             if(data.tags&& data.tags.length> 0){
//                 data.tags.map(text=>{
//                 let tag = new Tag({object_id : adv._id , tag_type : "adv" , tag : text });
//                 tag.save();
//                 tag_id = [...tag_id, tag._id]
//             })
//         }
//             adv['tags'] = tag_id
//             adv.save();
//             let obj = [{
//                 name : adv.title,
//                 price : parseInt(5),
//                 "currency": "USD"
//             }]
//             res.redirect(`/api/paypal/pay?price=${parseInt(5)}&path=${data.path}`)
           
//             // res.status(200).json(adv);
            
//             // adv.save((err , prod)=>{
//             //     if(!err){
//             //     }
//             //         res.status(200).json(prod);
//             //     }
//             //     else{
//             //         res.status(400).json(err);
//             //     }
//             // })
//         }
//     }catch(err){
//         console.log(err)
//         res.status(400).json(err.message);
//     }
// })


// router.put("/:adv_id" , Upload.array("images" , 5) , async(req , res)=>{
//     const data = req.body;
//     const {adv_id} = req.params;
//     const schema = Joi.object({
//         title : Joi.string(),
//         description :Joi.string(),
//         images:Joi.array(),
//         tags : Joi.array(),
//         city: Joi.string().required(),
//         state : Joi.string().required(),
//         price : Joi.number(),
//         user_id : Joi.string()
//     })
//     try{
//         let value = await schema.validateAsync(data);
//         if(!value.error){
//             if(req.files){
//                 let file = req.files;
//                 let images = []
//                 file.map(text=>{
//                     images = [ ...images , text.location]
//                 })
//                 data["images"] = images;
//             }else {
//                 data['images'] = data.images;
//             }
//             let adv = await Adv.findByIdAndUpdate(adv_id , {
//                 $set : data
//             } , {new : true});
//             res.status(200).json(adv);
//         }
//     }catch(err){
//         res.status(400).json(err.message);
//     }
// })


// router.get("/my_adv/:user_id" , async(req , res)=>{
//     const {user_id} = req.params;
//     try{
//         let adv = await Adv.find({user_id : user_id , deleted :{$ne : true} }).sort({_id :-1}).populate({ path: "tags", select: "tag" });
//         console.log("expired" , adv)
//         res.status(200).json(adv);
//     }catch(err){
//         res.status(400).json(err.message)
//     }
// });

// router.get("/" , async(req , res)=>{
//     const {tag} = req.query;
//     let page = 1;
//     req.query.page ? page = req.query.page : null;
//     let per_page = 30;
//     try{
//         if(tag){
//             let id = [];
//             let tag_data =await Tag.find({tag:{$regex :tag }  , tag_type :"adv" });
//             tag_data.map(text=>{
//                 id = [...id  ,text.object_id ];
//             });
//             let adv =await Adv.find({_id: { $in: id} , deleted : {$ne : true}  }).skip(per_page * page - per_page).limit(per_page).sort({_id : -1}).populate({path :'user_id' , select:'username , first_name , last_name , profile_picture'}).populate({ path: "tags", select: "tag" });
            
//             res.status(200).json(adv); 
//         }else{
//         let adv = await Adv.find({deleted : {$ne : true}}).skip(per_page * page - per_page).limit(per_page).sort({_id : -1}).populate({path :'user_id' , select:'username , first_name , last_name , profile_picture'}).populate({ path: "tags", select: "tag" });
//         res.status(200).json(adv);
//         }
//     }catch(err){
//         res.status(400).json(err.message)
//     }
// });


// router.get('/:adv_id' , async(req , res)=>{
//     const {adv_id} = req.params
//     try{
//         let data = await Adv.aggregate([
//             {
//                 $match : {_id : mongoose.Types.ObjectId(adv_id)}
//             },
//             {
//                 $lookup:
//                   {
//                     from: 'reviews',
//                     localField: '_id',
//                     foreignField: 'adv_id',
//                     as: 'reviews'
//                   }
//              },
//              {
//                 $lookup:
//                   {
//                     from: 'users',
//                     localField: 'user_id',
//                     foreignField: '_id',
//                     as: 'user'
//                   }
//              }
//         ]);
//         res.status(200).json(data);
//     }catch(err){
//         res.status(400).json(err.message)        
//     }
// })
// router.get('/admin/:adv_id' , async(req , res)=>{
//     const {adv_id} = req.params
//     try{
//         let data = await Adv.aggregate([
//             {
//                 $match : {_id : mongoose.Types.ObjectId(adv_id)}
//             },
//             {
//                 $lookup:
//                   {
//                     from: 'flags',
//                     localField: '_id',
//                     foreignField: 'adv_id',
//                     as: 'flag'
//                   }
//              },
//              {
//                 $lookup:
//                   {
//                     from: 'users',
//                     localField: 'user_id',
//                     foreignField: '_id',
//                     as: 'user'
//                   }
//              },
//              {
//                 $lookup:
//                   {
//                     from: 'users',
//                     localField: 'flag.user_id',
//                     foreignField: '_id',
//                     as: 'flag_user'
//                   }
//              }
//         ]);
//         res.status(200).json(data);
//     }catch(err){
//         res.status(400).json(err.message)        
//     }
// })



// router.delete("/:adv_id" , async(req , res)=>{
//     const {adv_id} =  req.params;
//     try{
//         let adv = await Adv.findByIdAndUpdate(adv_id , {
//             $set : {deleted : true}
//         } , {new : true});
//         res.status(200).json(adv);
//     }catch(err){
//         res.status(400).json(err.message);
//     }
// });


// router.delete('/', middlewear.checkToken, async (req, res) => {
//     const data = req.body;
//     let email = req.decoded._id;
//     try {
//       console.log("check" , data)
//       const schema = Joi.object({
//         ids: Joi.array().required(),
//       });
  
//       const value = await schema.validateAsync(data);
//       if (!value.error ) {
//         if(email != config.hopeup_admin){
//           return res.status(200).json({error : true , message : "You can not perform this operation"})
//         }
        
//         let ids = data.ids;
//         let obj = []
//         console.log("ids" , data)
//         for(let i =0 ; i < ids.length ; i++){
//           let adv = await Adv.findByIdAndUpdate(ids[i] , {$set :{deleted : true }} , {new : true});
//           obj = [...obj , adv]
//         }
       
//         res.status(200).json({ error: true, message: "Successfully deleted", deletedItems: obj })
//       }
//     } catch (err) {
//       console.log(err)
  
//       res.status(400).json({
//         error: true,
//         message: err.message
  
//       })
//     }
  
//   });
  
//  router.get("/view/:adv_id/:user_id" , async(req , res)=>{
//      const {adv_id  , user_id} = req.params;
//      try{
//         let adv = await Adv.findById(adv_id);
//         if(!adv.views.includes(user_id)){
//             adv.views = [...adv.views , user_id];
//         }
//         res.status(200).json(adv);
//      }catch(err){
//          res.status(400).json(err);
//      }
//  }) 

// router.post('/repost' , async(req , res)=>{
//     const data = req.body;
//     const schema = Joi.object({
//         adv_id : Joi.string().required(),
//         path : Joi.string()

//     })
//     try{
//         let value = await schema.validateAsync(data);
//         if(!value.error){
//             console.log("adv" , data)
//             let axios = await Adv.findById(data.adv_id);
//             axios.expired = false;
//             axios.save();
//             // let adv = await Adv.findByIdAndUpdate((data.adv_id) , {
//             //     $set : {expired : false}
//             // } , {new : true});
//             console.log("check" , axios)
//             // res.status(200).json(axios)
//             res.redirect(`/api/paypal/pay?price=${parseInt(5)}&path=${data.path}`)
           
//         }
//     }catch(err){
//         console.log(err)
//         res.status(400).json(err);
//     }
// })


module.exports = router;

