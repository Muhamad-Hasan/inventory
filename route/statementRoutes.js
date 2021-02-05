const express = require("express");
const Joi = require('@hapi/joi');
const Statment = require("../model/statement");
const User = require("../model/customer");
const Product = require("../model/finish_product");
const Statement = require("../model/statement");
const date = require("date-and-time");
const ejs = require("ejs");
const path = require("path");
const PDF = require("html-pdf");
const Invoice = require("../model/invoice")


const router = express.Router();

router.post("/", async (req, res) => {
    const data = req.body;
    console.log('DATA', data);
    const schema = Joi.object({
       c_id: Joi.string().required(),
       invoice_no :Joi.string(),
       description : Joi.string().allow(""),
       credit : Joi.number(),
       date : Joi.string()

    })
    try {
        let value = await schema.validateAsync(data);
        if (!value.error) {
            
            let statement = new Statement(data)
            let user = await User.findById(data.c_id);
            console.log("usrt" , user);
            if(data.credit > user.balance ){
                return res.status(400).json("user balance is less than credit amount");
            }
            let balance = user.balance - data.credit
            user.balance = balance;
            statement.balance  = balance
            user.save()
            statement.save()
            res.status(200).json(statement);
        }
    } catch (err) {
        console.log(err)
        res.status(400).json(err.message);
    }
})

router.post("/debit", async (req, res) => {
    const data = req.body;
    console.log('DATA', data);
    const schema = Joi.object({
       c_id: Joi.string().required(),
       invoice_no :Joi.string(),
       description : Joi.string().allow(""),
       debit : Joi.number(),
       date : Joi.string()

    })
    try {
        let value = await schema.validateAsync(data);
        if (!value.error) {
            
            let statement = new Statement(data)
            let user = await User.findById(data.c_id);
            console.log("usrt" , user);
            let balance = user.balance + data.debit
            user.balance = balance;
            statement.balance  = balance
            user.save()
            statement.save()
            res.status(200).json(statement);
        }
    } catch (err) {
        console.log(err)
        res.status(400).json(err.message);
    }
})

router.delete("/:id" , async(req , res)=>{
    const {id} = req.params;

    try{
        let statement = await Statement.findById(id);
        console.log("statement" , statement);
        let user_amount = 0
        if(statement.credit > 0){
            let user = await User.findById(statement.c_id);
            let balance = user.balance - statement.credit;
            user.balance = balance;
            user.save();
            let deleteRecord = await Statement.findByIdAndRemove(id);
            console.log("de;ete" , deleteRecord);
            res.status(200).json({
                message : "Succefully Deleted"
            })
        }else{
            if(statement.invoice_no){
                let invoice = await Invoice.findOne({invoice_no : statement.invoice_no})
                console.log("Invoice" , invoice);
                if(invoice && invoice.products){
                    let products = invoice.products
                for (let i = 0; i < products.length; i++) {
                
                    let product = await Product.findById(products[i].product_id);
                    console.log("product" , product);
                    product.stock = product.stock +  products[i].ctns;
                    // user_amount = user_amount + products[i].amount;
                    product.save()
                }
                let invoiceDelete = await Invoice.findByIdAndRemove(invoice._id)
            
                }
                
            }
            
            let user = await User.findById(statement.c_id);
            let balance = user.balance - statement.debit;
            user.balance = balance;
            user.save();
            let deleteRecord = await Statement.findByIdAndRemove(id);
            console.log("de;ete" , deleteRecord);
            res.status(200).json({
                message : "Succefully Deleted"
            })
        }
    }catch(err){
        console.log(err);
        res.status(400).json(err)
    }
})

router.get("/" , async(req , res)=>{
    try{
        let data = await Statement.find().populate("c_id");
        res.status(200).json(data)
    }catch(err){
        res.status(400).json(err)
    }
})

router.get("/pdf/:id" , async(req , res)=>{
    try{
        console.log("id" , req.params.id);
        let id;
        if(req.params.id.length != 24){
            let user = await User.findOne({c_id : req.params.id})
            id = user._id
        }else{
            id = req.params.id
        }
       let data = await Statement.find({c_id : id}).populate("c_id");
       console.log("data" , data);
       let ejs_data = {
        data : data,
        name  : data && data[0].c_id && data[0].c_id.name,
        address : data && data[0].c_id && data[0].c_id.address,
        phone : data && data[0].c_id && data[0].c_id.phone

        }
       console.log("ejs_data" ,ejs_data );
        ejs.renderFile(path.join(__dirname, "../view/statement.ejs"), {
            ejs_data
        }, (err, data) => {
            console.log("data" , data , err);
            if (!err) {
                  var options = {  
                      format: 'A4', 
                      orientation: 'portrait',
                      type: "pdf",
                     
                      paginationOffset: 1,       // Override the initial pagination number
                      "header": {
                        "height": "10mm",
                        // "contents": '<div style="text-align: center;">Author: Marc Bachmann</div>'
                      },
                      "footer": {
                        "height": "10mm",
                        "contents": {
                            1: '<div style="text-align: center;">1</div>',
                            2: '<div style="text-align: center;">2</div>',
                            3: '<div style="text-align: center;">3</div>',
                            4: '<div style="text-align: center;">4</div>',
                            5: '<div style="text-align: center;">5</div>',
                            6: '<div style="text-align: center;">6</div>',
                            7: '<div style="text-align: center;">7</div>',
                            8: '<div style="text-align: center;">8</div>',
                            9: '<div style="text-align: center;">9</div>',
                            10: '<div style="text-align: center;">10</div>',
                            11: '<div style="text-align: center;">1<1/div>',
                            12: '<div style="text-align: center;">1</2div>',
                            
                            }
                      }
                    }
                  PDF.create(data, options).toFile(path.join(__dirname ,`../statement/${ejs_data && ejs_data.name}.pdf` ) ,function(err, res) {
                      if (err) return console.log(err);
                           console.log(res , "created");
                      });
            } 
            else {
                console.log(err);
            }

        })
        res.status(200).json(`${ejs_data.name}.pdf`);
    
    }catch(err){
        console.log("err" , err);
        res.status(400).json(err)
    }
})


router.get("/:id" , async(req , res)=>{
    try{
        let data = await Statement.find({c_id:req.params.id}).populate("c_id");
        res.status(200).json(data)
    }catch(err){
        res.status(400).json(err)
    }
})

module.exports = router;

