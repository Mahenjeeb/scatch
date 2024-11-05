const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/productsController")
const upload = require("../config/multer-config");

router.get("/", (req,resp) => {
    resp.send("I am product")
})
router.post("/create", upload.single("image"), createProduct);
module.exports = router;