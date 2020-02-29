//
const express = require("express");
const app = express();
const { filterProductByAttribute } = require("./helper.js");
//
const Categorys = require("./models/Category");
//
const Products = require("./models/Product");
//
app.get("/", (req, res) => {
  res.send("Project Task ");
});
app.get("/getAllCategory", (req, res) => {
  res.json({
    msg: "Category with Product",
    count: Categorys.length,
    Data: Categorys
  });
});
app.get("/getAllProduct", (req, res) => {
  res.json({ count: Products.length, Data: Products });
});
app.get("/getProduct/:id", (req, res) => {
  ID = req.params.id;
  res.json(Products[ID]);
});
app.get("/deleteCategory/:id", (req, res) => {
  ID = req.params.id; //index
  if (Categorys[ID].isActive) {
    Categorys.splice(ID, 1);
    filterProductByAttribute(Products, "catId", ID);
    return res.json("Deleted successfully");
  }
  return res.json(Categorys);
});

//
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});
