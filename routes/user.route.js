const express = require("express");
const router = express.Router();
const User = require("../models/user.model")


router.get("/login", (req, res)=>{
    return res.render("login")
})

router.get("/signup", (req, res)=>{
    return res.render("signup")
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    if (!token) {
      return res.render("login", {
        error: "Incorrect email or Password",
      });
    }

    res.cookie("token", token, { httpOnly: true }); // Set only the token as the cookie
    return res.redirect("/");
  } catch (error) {
    console.error("Error during login:", error);
    return res.render("login", {
      error: "Incorrect email or Password",
    });
  }
});


router.get("/logout", async(req, res)=>{
  res.clearCookie('token').redirect("/")
})



router.post("/signup", async (req, res) => {
  const { email, userName, password } = req.body;

  try {
    // Validate form data (optional but recommended)
    if (!email || !userName || !password) {
      return res.status(400).send("All fields are required.");
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already exists.");
    }

    // Create a new user
    const newUser = new User({
      userName,
      email,
      password, // Password hashing handled in the `pre('save')` middleware
    });

    await newUser.save(); // Save user to the database

    res.render("login");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("An error occurred while signing up.");
  }
});



module.exports = router