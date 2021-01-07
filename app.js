const express = require("express");
const mongoose = require("mongoose");
const path = require("path")
const product = require("./route/finisih_product");

// const pdf = require("./view/pdf.ejs");
const ejs = require("ejs");
const pdf = require("html-pdf")

const connect = mongoose.connect("mongodb+srv://maclayUser:Tov05ZSUvcScyKlw@cluster0.euvws.mongodb.net/inventory?retryWrites=true&w=majority", {
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

// app.use("/pdf" ,express.static("pdf"));
// app.use("/statement" ,express.static("statement"));

// app.use("/" , express.static("./web"));
app.use("/api/product" , product)


module.exports = app;
