require('dotenv').config(); // Load .env file content into process.env

// Export environment variables as an object
const config = {
    PORT: process.env.PORT || 8000, // Default to 8000 if PORT is not set
    DB_URI: process.env.DB_URI, // Database URI
    JWT_SECRET: process.env.JWT_SECRET, // Secret key for JSON Web Token
    NODE_ENV: process.env.NODE_ENV || 'development', // Default to 'development' if not set
    API_KEY: process.env.API_KEY, // Example for an API key
    MONGODB_URL: process.env.MONGODB_URL
};

module.exports = config;
