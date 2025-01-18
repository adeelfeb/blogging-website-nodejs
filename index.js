const express = require("express")
const morgan = require('morgan');
const path = require("path")
const cors = require("cors")
const bodyParser = require('body-parser');
const config = require('./config');
const userRouter = require("./routes/user.route")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose");
const { checkForAuthenticationCookie } = require("./middleware/authentication");


const app = express()
mongoose.connect("mongodb://127.0.0.1:27017/blogIt")
.then((e)=> console.log("Mongodb connected"))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

// Middleware
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token'))
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan('dev')); // Log HTTP requests to the console
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies

app.get("/", (req, res)=>{
    
    return res.render("home", {
        user: req.user
    })
})

app.use("/", userRouter)

app.listen(config.PORT, () => {
    console.log(`Server running on the http://localhost:${config.PORT} in ${config.NODE_ENV} mode`);
});