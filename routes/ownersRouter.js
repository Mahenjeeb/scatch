const express = require("express");
const router = express.Router();

router.get("/", (req,resp) => {
    resp.send("I am owner")
})

module.exports = router;