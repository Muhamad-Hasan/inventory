const express = require("express");
const mongoose = require("mongoose");
const path = require("path")
const raw = require("./route/rawmaterialRoutes");
const finish = require("./route/rawfinishRoutes");
const packaging = require("./route/packaging_material");
const product = require("./route/finisih_product");
const customer = require("./route/customerRoutes");
const invoice = require("./route/invoiceRoures");
const statement = require("./route/statementRoutes");
const report = require("./route/reportRoutes");

// const pdf = require("./view/pdf.ejs");
const ejs = require("ejs");
const pdf = require("html-pdf")

const connect = mongoose.connect("mongodb+srv://maclayUser:Tov05ZSUvcScyKlw@cluster0.euvws.mongodb.net/inventoryDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 
});
connect.then(
  (db) => {
    console.log("Connected correctly to server");
  },
  (err) => {
    console.log(err);
  }
);
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/pdf" ,express.static("pdf"));
app.use("/statement" ,express.static("statement"));

app.use("/" , express.static("./web"));
app.use("/api/raw" , raw);
app.use("/api/finish" , finish);
app.use("/api/packaging" , packaging)
app.use("/api/product" , product)
app.use("/api/customer" , customer);
app.use("/api/invoice" , invoice);
app.use("/api/statement" , statement)
app.use("/api/report" , report)


module.exports = app;
