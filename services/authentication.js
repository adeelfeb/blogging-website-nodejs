const jwt = require("jsonwebtoken");
const config = require("../config");

const secret = config.JWT_SECRET;

function createTokenForUser(user) {
    // Validate user object
    if (!user || !user._id || !user.email || !user.role) {
        throw new Error("Invalid user object. Ensure _id, email, and role are provided.");
    }

    const payload = {
        _id: user._id,
        email: user.email,
        profileImageUrl: user.profileImageUrl || "", // Optional field
        role: user.role,
    };

    try {
        // Add expiration time to the token
        const token = jwt.sign(payload, secret, { expiresIn: "1h" }); // 1 hour expiration
        return token;
    } catch (error) {
        throw new Error("Failed to create token. Please check the secret and payload.");
    }
}

function validateToken(token) {
    if (!token) {
        throw new Error("Token is required for validation.");
    }

    try {
        const payload = jwt.verify(token, secret);
        return payload;
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new Error("Token has expired. Please login again.");
        } else if (error.name === "JsonWebTokenError") {
            throw new Error("Invalid token. Ensure it is correct and unmodified.");
        } else {
            throw new Error("Failed to validate token. An unknown error occurred.");
        }
    }
}

module.exports = {
    createTokenForUser,
    validateToken,
};
