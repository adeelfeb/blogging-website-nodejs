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
      const user = await User.matchPassword(email, password);
  
      if (!user) {
        return res.status(401).send("Invalid email or password");
      }
  
      res.status(200).send(`Welcome ${user.userName}`);
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).send("Server error");
    }
  });



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

    res.status(201).send("User created successfully!");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("An error occurred while signing up.");
  }
});



module.exports = router