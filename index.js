//Import External Modules
const express = require("express");

// Initiate Express instance
const app = express();

//Import Helper Method
const helper = require("./helper");

// Importing the Models
const Categorys = require("./models/Category");
const Products = require("./models/Product");

/////////////////////////////// Routing ///////////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.send("Project Task ");
});
// Get All the category
app.get("/getAllCategory", (req, res) => {
  res.json({
    msg: "Category with Product",
    count: Categorys.length,
    Data: Categorys
  });
});
// Get All the Product
app.get("/getAllProduct", (req, res) => {
  res.json({ count: Products.length, Data: Products });
});
// Get a Product
app.get("/getProduct/:id", (req, res) => {
  ID = req.params.id;
  res.json(Products[ID]);
});
// Get a Category
app.get("/getCategory/:id", (req, res) => {
  ID = req.params.id;
  res.json(Categorys[ID]);
});
// Delete Category w.r.t product
app.get("/deleteCategory/:id", (req, res) => {
  ID = req.params.id; //index
  if (Categorys[ID].isActive) {
    helper.filterProductByAttribute(Products, "catId", ID);
    Categorys.splice(ID, 1);
    return res.json("Deleted successfully");
  }
  return res.json(Categorys);
});

// Establish the server connection
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});
