const express = require("express");
const mongoose = require("mongoose");
const app = express();
const server = require("http").Server(app);
const bodyParser = require("body-parser");
const cors = require("cors");
const APP = require("./app");



app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true 
}));
app.use(cors());
app.use(express.json());
app.use(APP);


server.listen(process.env.PORT || 5000, () => {
  console.log(`Server running `, process.env.PORT || 5000);
});
