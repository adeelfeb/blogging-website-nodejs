const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/user.model");

function checkForAuthenticationCookie(cookieName) {
    return async (req, res, next) => {
      const cookie = req.cookies[cookieName];
  
      // Ensure the cookie is valid and contains the token string
      const token = typeof cookie === "object" && cookie.token ? cookie.token : null;
  
      if (!token || typeof token !== "string") {
        console.error("Token not found or invalid type:", cookie);
        req.user = null;
        return next();
      }
  
      try {
        const payload = jwt.verify(token, config.JWT_SECRET);
        const user = await User.findById(payload._id).select("-password -salt"); // Exclude password field

        req.user = user || null;
      } catch (error) {
        console.error("Error verifying token:", error);
        req.user = null;
      }
  
      next();
    };
  }
  

module.exports = { checkForAuthenticationCookie };
