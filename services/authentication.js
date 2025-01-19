const jwt = require("jsonwebtoken");
const config = require("../config");

const secret = config.JWT_SECRET;

function createTokenForUser(user) {
    if (!user || !user._id || !user.email || !user.userName || !user.role) {
        console.warn("User object is incomplete. Token creation skipped.");
        return null; // Return `null` if validation fails instead of throwing an error
    }

    const payload = {
        _id: user._id,
        email: user.email,
        profileImageUrl: user.profileImageUrl || "", // Optional field
        userName: user.userName,
        role: user.role
    };

    try {
        const token = jwt.sign(payload, secret, { expiresIn: "5h" });
        return token;
    } catch (error) {
        console.error("Failed to create token:", error.message);
        return null; // Return `null` in case of a token generation failure
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
