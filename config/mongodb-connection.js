const mongoose = require("mongoose");
const config = require('config');
const debug = require('debug')("development:mongoose");
const dbConn = async () => {
    try {
        await mongoose.connect(`${config.get("MongoDB_URI")}/scatch`);
        debug("connected")
    } catch (error) {
        debug(error.message) 
    }
}

dbConn();
module.exports = mongoose.connection;