const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String }, // Salt is required
});

// Pre-save middleware to hash password and generate salt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    // Generate salt
    this.salt = await bcrypt.genSalt(10);

    // Hash password with salt
    this.password = await bcrypt.hash(this.password, this.salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Static method to match password
userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email }); // Find the user by email
  if (!user) return false;

  // Compare provided password with stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch ? user : false; // Return the user object if match, else false
});

// Method to exclude sensitive fields from user data
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password; // Remove password
  delete userObject.salt;     // Remove salt
  return userObject;          // Return the sanitized object
};

const User = mongoose.model("User", userSchema);

module.exports = User;
