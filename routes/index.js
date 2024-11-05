const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/isLoggedIn")
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", (req,resp) => {
    let error = req.flash("error")
    resp.render("index",{ error, logged_in_User: false });
});
router.get("/shop", isLoggedIn, async (req,resp) => {
    let products = await productModel.find();
    resp.render("shop",{products});
})
router.get("/cart/:id", isLoggedIn, async (req,resp) => {
    let product = await productModel.findOne({_id: req.params.id});
    console.log(product.id)
    let user = await userModel.find();
    // user.cart.push(product.id)
    // await user.save();
    console.log()
    resp.render("cart");
})
// router.get("/cart", isLoggedIn, async (req,resp) => {
//     resp.render("cart");
// })

module.exports = router;