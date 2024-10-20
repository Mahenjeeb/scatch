const express = require("express");
const router = express.Router();

router.get("/", (req,resp) => {
    resp.send("I am user")
});

module.exports = router;