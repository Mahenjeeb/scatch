const mongoose = require("mongoose");

const dbConn = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1/scatch")
        console.log("connected")
    } catch (error) {
       console.log(error.message) 
    }
}

dbConn();
module.exports = mongoose.connection;