const express = require('express');
const path = require('path');
const db = require("./config/mongodb-connection")
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const flash = require("flash");
const app = express();
const indexRouter = require("./routes/index");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");

require('dotenv').config();

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(cookieParser());
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

//Handling Routes
app.use("/",indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.get("/", (req,resp) => {
    resp.render("index");
})
app.listen(3000);