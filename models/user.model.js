const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { createTokenForUser } = require("../services/authentication");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String },
  role:{
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER"
  },
  profileImageUrl:{
    type: String,
    default: "/images/default.png"
  }
});

// Pre-save middleware to hash password and generate salt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, this.salt); // Hash password
    next();
  } catch (error) {
    next(error);
  }
});

// Static method to match password and generate token
userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
  const user = await this.findOne({ email }); // Find the user by email
  if (!user) return { error: "User not found" };

  const isMatch = await bcrypt.compare(password, user.password); // Check password
  if (!isMatch) return false;

  // Exclude sensitive fields from the payload
  const sanitizedUser = {
    _id: user._id,
    email: user.email,
    profileImageUrl: user.profileImageUrl || "", // Optional field
    userName: user.userName,
    role: user.role
  };

  // Generate JWT token
  const token = createTokenForUser(sanitizedUser);

  return { token, user: sanitizedUser }; // Return token and sanitized user data
});

// Method to exclude sensitive fields from user data
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password; // Remove password
  delete userObject.salt;     // Remove salt
  return userObject;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
