const express = require("express")
const morgan = require('morgan');
const path = require("path")
const cors = require("cors")
const bodyParser = require('body-parser');
const config = require('./config');



const app = express()


app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan('dev')); // Log HTTP requests to the console
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies

app.get("/", (req, res)=>{
    console.log("hi thre")
    return res.render("home")
})

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT} in ${config.NODE_ENV} mode`);
});