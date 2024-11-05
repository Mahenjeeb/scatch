const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");

module.exports.isLoggedIn = async (req, resp, next) => {
  let token = req.cookies.token;
  if (!token) {
    req.flash("error", "You need to login first");
    return resp.redirect("/");
  }
  try {
    let decoded = jwt.verify(token, process.env.JWT_KEY);
    let user = userModel.findOne({ email: decoded.email }).select("-password");
    req.user = user;
    next();
  } catch (error) {
    req.flash("error", "Something went wrong");
    resp.redirect("/");
  }
}
