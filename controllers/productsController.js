const productModel = require("../models/product-model");
module.exports.createProduct = (req, resp) => {
try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    let createProduct = productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    req.flash("success","Product Created Successfully");
} catch (error) {
    req.flash("error","Something Went Wrong");
}
resp.redirect("/owners/admin")
};
