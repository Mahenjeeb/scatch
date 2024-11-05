const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, resp) => {
  let { fullname, email, password } = req.body;
  let isEmail = await userModel.findOne({ email: email });
  if (isEmail) {
    req.flash("error","You already have an account"); 
    return resp.redirect("/");
  }
  try {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return resp.send(err.message);
        let createdUser = await userModel.create({
          fullname,
          email,
          password: hash,
        });
        let token = generateToken(createdUser);
        resp.cookie("token", token);
        resp.redirect("/");
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.loginUser = async (req, resp) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email: email });
  if (!user) {
    req.flash("error","Invalid Email Id or Pasword");
    return resp.redirect("/");
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
        let token = generateToken(user);
        resp.cookie("token", token);
        resp.redirect("/shop");
    } else {
        req.flash("error","Invalid Email Id or Pasword");
        resp.redirect("/");
    }
   
  });
};

module.exports.logoutUser = (req, resp) => {
  resp.cookie("token", "");
  resp.redirect("/");
};