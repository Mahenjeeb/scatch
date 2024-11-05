const express = require("express");
const ownerModel = require("../models/owner-model");
const router = express.Router();

if(process.env.NODE_ENV == "development") {
    router.post("/create", async(req,resp) => {
        let owner = await ownerModel.find();
        if(owner.length > 0) {
            resp.send("A owner already exists")
        } else {
            let {fullname, email, password} = req.body;
            let createdOwner = await ownerModel.create({
                fullname,
                email,
                password
            })
           resp.send("Owner Created")
        }
    })
}

router.get("/admin", (req,resp) => {
    let success = req.flash("success");
    resp.render("createproducts",{success})
})


module.exports = router;