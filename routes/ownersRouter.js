const express = require("express");
const ownerModel = require("../models/owner-model");
const router = express.Router();

if(process.env.NODE_ENV == "development") {
    router.post("/create", async(req,resp) => {
        let owner = await ownerModel.find();
        if(owner.length > 0) {
            return resp.status(500).send("A owner already exists")
        } else {
            let {fullname, email, password} = req.body;
            let createdOwner = await ownerModel.create({
                fullname,email,password
            })
           return resp.status(200).send(`${fullname} - Owner Created`)
        }
    })
}

router.get("/", (req,resp) => {
    resp.send("I am owner")
})


module.exports = router;