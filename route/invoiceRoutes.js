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


const router = express.Router();

const generate_Net = async (tp, t, q, a) => {
    let net = 0
    if (t == "/") {
        net = ((tp * q) - a) / q
    }
    else if (t == "+") {
        let real_tp = tp * q;
        let newTp = parseInt(q)+ parseInt(a)
        net = real_tp/newTp
        console.log("tp" , tp , q , a ,real_tp , newTp , net);
    }
    else {
       net = tp 
    }
    console.log("trp" , net);
    return net
}

const calculate_total = async (products) => {
    let total = 0;
    products.map(p => {
        total = total + p.amount
    })
    return total
}

const calculate_ctn = async (products) => {
    let ctns = 0
    products.map(p => {
        console.log("ccc", p);
        ctns = parseFloat(ctns) + Math.ceil(parseFloat(p.ctns))
    })
    console.log("ctn", ctns);
    return ctns
}

router.post("/", async (req, res) => {
    const data = req.body;
    console.log('DATA', data);
    const schema = Joi.object({
        c_id: Joi.string().required(),
        bilty_amount: Joi.number(),
        bilty_no: Joi.string().allow("").required(),
        products: Joi.array().required(),
        note: Joi.string().allow(""),
        return_amount :Joi.string(),
        type: Joi.string().valid("normal" , "return")

    })
    try {
        let value = await schema.validateAsync(data);
        if (!value.error) {
            let message = [];
            let user = await User.findById(data.c_id);
            let products = data.products;
            let last_invoice = await Invoice.find({c_id :data.c_id }).sort({ _id: -1 }).limit(1);
            let invoice_no;
            if(last_invoice.length > 0){
                // console.log("index" , last_invoice[0]);
                let index = last_invoice[0].invoice_no.indexOf("-");
            let i = last_invoice[0].invoice_no;
            let inv =  parseInt(i.slice(index+1 , i.length))+1;
            invoice_no = `${user.c_id}-${inv}`;
            }else{
                invoice_no = `${user.c_id}-1`;
                
            }
            // console.log(user, last_invoice);
            let final_product = []
            for (let i = 0; i < products.length; i++) {
                let product_data = await Product.findById(products[i]._id);
            
                console.log("product_data" , product_data);
                let price_by_region = product_data.price;
                let ctn_size = product_data.carton_size;
                // if(products[i].region =="south"){
                   
//                 }else{
//                     price_by_region =  product_data.north_price;
// }
                let net = await generate_Net(price_by_region, products[i].st, products[i].sq, products[i].sa);
                let total_discount = parseInt(user.discount) + parseInt(products[i] && products[i].discount ? products[i].discount : 0)
                let price = net - (net * total_discount ) / 100;
                let quantity = 0;
                let ctns = 0;
                // if(products[i].q_type == "carton"){
                //     quantity = parseInt(products[i].quantity) * parseInt(product_data.carton_size);
                //     ctns = products[i].quantity
                    
                // }else{
                    console.log("cartonsize" , product_data.carton_size , typeof product_data.carton_size  );
                    quantity = products[i].quantity;
                    ctns =  (products[i].quantity / (products[i].q_type == "large" ?  product_data.carton_size:(parseFloat(product_data.carton_size/2))))
                // }
                console.log("ctns" , ctns);
                if(products[i].q_type == "large" && product_data.stock >= ctns || products[i].q_type == "small" && product_data.stock >= (ctns/2)  ){
                    if(products[i].q_type == "large"){
                        product_data["stock"] = product_data.stock - ctns ;
                
                    }else{
                        product_data["stock"] = product_data.stock - (ctns/2) ;
                
                    }
                    
                let obj = {
                    ctns:ctns.toFixed(2),
                    quantity: quantity,
                    name: `${product_data.name}  ${product_data.product_size ? ',' : ""} ${product_data && product_data.product_size ?product_data.product_size :"" } ${product_data.product_size? "," : ""} ${product_data&& product_data.product_color ? product_data.product_color : ""  } `,
                    carton_size : products[i].q_type == "large" ? ctn_size : ctn_size/2,
                    size: product_data.product_size,
                    color: product_data.product_color,
                    tp: price_by_region,
                    scheme:products[i].sa? `${products[i].sq} ${products[i].st} ${products[i].sa}` : "",
                    net_tp: net,
                    disc: total_discount,
                    price: price,
                    amount: price * quantity,
                    product_id : product_data.product_id

                };
                product_data.save()
                final_product = [...final_product, obj];
                let sale = new Sale({
                    c_id : data.c_id  , 
                    p_id : product_data._id,
                    ctns  , 
                    quantity  ,
                    amount : obj.amount 
                });
                sale.save();
                // console.log("sale" , sale);
                }else{
                    message = [...message ,product_data.name ]
                }
                
            }
            console.log("final", final_product);
            if(final_product.length > 0){
                let total = await calculate_total(final_product);
                console.log("total" , total);
                data["invoice_no"] = `${invoice_no}`;
                data["total_amount"] = total;
                data["return_amount"] = data.return_amount;
                data["grand_total"] = data.type == "normal" ?  total - data.bilty_amount : total - data.bilty_amount - data.return_amount;
                data["ctn_no"] = await calculate_ctn(final_product);
                data["products"] = final_product;
                user["balance"] = user.balance + data["grand_total"]
                user.save();
                data["balance"] = user.balance;
                
                
                // console.log("total", total , data);
                let invoice = new Invoice(data);
                invoice.save();
                
                let text = "";
            if(message.length> 0 ){
                message.map(m=>{
                    text = text + " ,"+m 
                })
                text = message.length> 1? text + " are not in stock" : text + " is not in stock";
    
            }else{
                text = "Successfully Created" 
            }
            
            let tcs = new Statement({c_id : data.c_id , 
                invoice_no: data.invoice_no ,
                debit :  invoice.grand_total.toFixed(2) , 
                balance : user.balance, 
                date : new Date()
             });
            tcs.save();
            res.status(200).json(text);
            }else{
                res.status(201).json("Not in stock");
            }
            // let items = final_product;
            // let t_no = "";
            // let t_ad = ''
            // invoice.transport_no.map(t => {
            //     t_no = t_no.length > 0 ?  t_no+ " , " + t : t
            // })
            // invoice.transport_address.map(t => {
            //     t_ad = t_ad.length > 0 ? t_ad + " , " + t : t
            // })
            

            
        } else {
            res.status(400).json(err);
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

