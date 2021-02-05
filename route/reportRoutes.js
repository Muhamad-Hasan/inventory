const express = require("express");
const Joi = require('@hapi/joi');
const Invoice = require("../model/invoice");
const User = require("../model/customer");
const Product = require("../model/finish_product");
const ejs = require("ejs");
const path = require("path")
const PDF = require("html-pdf");
const date = require("date-and-time")
const Statement = require("../model/statement");
const Sale = require("../model/sale");
const invoice = require("../model/invoice");


const router = express.Router();

router.get("/:c_id/:month", async (req, res) => {
    const data = req.params;
    console.log('DATA', data);
    const schema = Joi.object({
        c_id: Joi.string().required(),
        month: Joi.string().required(),
        
    })
    try {
        let value = await schema.validateAsync(data);
        if (!value.error) {
            let now = new Date()
            let startDate = new Date(now.getFullYear() , data.month , 2 , 0 , 0 , 0 , 0);
            let endDate = new Date(now.getFullYear() , data.month , 32 , 0 , 0 , 0 , 0);
            console.log("lpog" , new Date(startDate) , new Date(endDate));
            let array = []
            let user = await User.findById(data.c_id);
            let invoices = await Invoice.find({c_id : data.c_id , createdAt : {$gte : startDate  , $lte : endDate}});
            invoices.map(text=>{
                array = [...text.products , ...array]
            })
            let ids = ["cbcs" , "cbcl" , "fcs" , "fcl" , "wtc" , "wts" , "cs70" , "cs110" , "f25" , "f50" , "f80" , "cc" , "fwc" , "fwfc" , "fwmec" , "hrcs" , "hrcl" , "bbcs" , "bbcl" , "s" , "c" , "cm" , "l"]
            let total_prices = {}
            const reducer = (accumulator, currentValue) => accumulator.amount + currentValue;
            let invoice_list = []
            
            // invoices.map(text=>{
            //     let item = []
            //     text.products.map(p=>{
            //         item = [
            //             text.createdAt , 
            //         ]
            //     })
            // })
            // ids.map(i=>{
                
            //         total_prices[i] = array.filter(f=> f.product_id == i)
                
            // })
            console.log("total_prices" , invoices);
            let ejs_data = {
                username : user.name , 
                month : data.month+1 +" ,"+ now.getFullYear(),
                invoices , 
                array
            }
            // console.log("invoices" , invoices);
            ejs.renderFile(path.join(__dirname, "../view/report.ejs"), {
                ejs_data
            }, (err, data) => { 

            // res.status(200).json({user , invoices})
            if(!err){
                res.send(data)
                // var options = {  format: 'A4', orientation: 'landscape',type: "pdf" };
                // // console.log("data" , data);
                // PDF.create(data, options).toFile(path.join(__dirname ,`../pdf/${ejs_data.username}.pdf` ) ,function(err, res) {
                //     if (err) return console.log(err);
                //          console.log(res , "created");
                //     });           
                 }else{
                res.send(err)
            }
            
        })    
    }
    } catch (err) {
        console.log(err)
        res.status(400).json(err.message);
    }
})


router.get("/" , async(req , res)=>{
    try{
        let data = await Invoice.find().populate("c_id").sort({_id :-1});
        console.log("length" , data.length);
        res.status(200).json(data)
    }catch(err){
        res.status(400).json(err)
    }
})


router.get("/:id" , async(req , res)=>{
    try{
        let data = await Invoice.find({c_id : req.params.id}).populate("c_id");
        res.status(200).json(data)
    }catch(err){
        res.status(400).json(err)
    }
})


router.get("/pdf/:id" , async(req , res)=>{
    try{
       let data = await Invoice.findById(req.params.id).populate("c_id");
       console.log("data" , data);
       let ejs_data = {
        invoice_no: data.invoice_no, 
        date: date.format(data.date, 'DD/MM/YYYY hh:mm A'),
        due_date: date.format(date.addDays(data.date, 30),"DD/MM/YYYY") ,
        name: data.c_id.name, 
        address: data.c_id.address,
        phone: data.c_id.address, 
        items: data.products, 
        total_amount: data.total_amount.toFixed(2), 
        bilty_no: data.bilty_no, 
        bilty_amount: data.bilty_amount.toFixed(2),
        ctns: data.ctn_no, 
        grand_total: data.grand_total.toFixed(2), 
        balance: data.c_id.balance,
        note: data.note,
        
        }
        if(data.return_amount){
            ejs_data["return_amount"] = data.return_amount
        }

        ejs.renderFile(path.join(__dirname, "../view/pdf.ejs"), {
            ejs_data
        }, (err, data) => { 
            // res.send(data)
            if (!err) {
                  var options = {  format: 'A4', orientation: 'portrait',type: "pdf" };
                  console.log("data" , data);
                  PDF.create(data, options).toFile(path.join(__dirname ,`../pdf/${ejs_data.invoice_no}.pdf` ) ,function(err, res) {
                      if (err) return console.log(err);
                           console.log(res , "created");
                      });
            } 
            else {
                console.log(err);
            }

        })
       
        // res.sendFile(path.join(__dirname , "../pdf/"+ejs_data.invoice_no+".pdf"))
        res.status(200).json(`${data.invoice_no}.pdf`);
    
    }catch(err){
        console.log("err" , err);
        res.status(400).json(err)
    }
})

router.get("/html/:id" , async(req , res)=>{
    try{
       let data = await Invoice.findById(req.params.id).populate("c_id");
       console.log("data" , data);
       let ejs_data = {
        invoice_no: data.invoice_no, 
        date: date.format(data.date, 'DD/MM/YYYY hh:mm A'),
        due_date: date.format(date.addDays(data.date, 30),"DD/MM/YYYY") ,
        name: data.c_id.name, 
        address: data.c_id.address,
        phone: data.c_id.address, 
        items: data.products, 
        total_amount: data.total_amount.toFixed(2), 
        bilty_no: data.bilty_no, 
        bilty_amount: data.bilty_amount.toFixed(2),
        ctns: data.ctn_no, 
        grand_total: data.grand_total.toFixed(2), 
        balance: data.c_id.balance,
        note: data.note,
        
        }
        if(data.return_amount){
            ejs_data["return_amount"] = data.return_amount
        }

        ejs.renderFile(path.join(__dirname, "../view/pdf.ejs"), {
            ejs_data
        }, (err, data) => { 
           
            if (!err) {
                var options = {  format: 'A4', orientation: 'portrait',type: "pdf" };
                console.log("data" , data);
                PDF.create(data, options).toFile(path.join(__dirname ,`../pdf/${ejs_data.invoice_no}.pdf` ) ,function(err, res) {
                    if (err) return console.log(err);
                         console.log(res , "created");
                    });
                    res.sendFile(path.join(__dirname , "../pdf/"+ejs_data.invoice_no+".pdf"))
            } 
            else {
                console.log(err);
            }

        })
       
        // res.sendFile(path.join(__dirname , "../pdf/"+ejs_data.invoice_no+".pdf"))
        // res.status(200).json(`${data.invoice_no}.pdf`);
    
    }catch(err){
        console.log("err" , err);
        res.status(400).json(err)
    }
})


router.post("/dates" , async(req , res)=>{
    console.log("dates toucj" , req.body);
    let from  = new Date(req.body.from);
    let to  = new Date(req.body.to);
    let fromDate = new Date(from.getFullYear() , from.getMonth() , from.getDate())
    let endDate = new Date(to.getFullYear() , to.getMonth() , to.getDate()+1)
    console.log('dates' , fromDate , endDate);

    

    let data = await Invoice.find({"createdAt" : {$gte : new Date(fromDate) , $lte : new Date(endDate)}}).populate("c_id");
    res.status(200).json(data)
})


router.get("/all/count" , async(req , res)=>{
    try{
        console.log("start" );
        let user = await User.countDocuments({deleted: false});
        let product = await Product.countDocuments({deleted: false});
        let invoice = await Invoice.countDocuments({deleted: false});
        let obj = {
            user , product , invoice
        }
        console.log("obj" , obj);
        res.status(200).json(obj)
        
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})
// router.get("/:id" , async(req , res)=>{
//     try{
//        res.render(`../pdf/${req.params.id}`);
//     }catch(err){
//         res.status(400).json(err)
//     }
// })

module.exports = router;

