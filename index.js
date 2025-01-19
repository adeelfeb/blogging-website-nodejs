const express = require("express")
const morgan = require('morgan');
const path = require("path")
const cors = require("cors")
const bodyParser = require('body-parser');
const config = require('./config');
const userRoute = require("./routes/user.route")
const blogRoute = require("./routes/blog.route")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose");
const { checkForAuthenticationCookie } = require("./middleware/authentication");
const Blog = require("./models/blog.model")


const app = express()
mongoose.connect("mongodb://127.0.0.1:27017/blogIt")
.then((e)=> console.log("Mongodb connected"))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

// Middleware
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token'))
app.use(cors()); // Enable Cross-Origin Resource Sharing
// app.use(morgan('dev')); // Log HTTP requests to the console
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(express.static(path.resolve("./public")))

app.get("/", async (req, res) => {
    try {
      const allBlogs = await Blog.find({})
        .sort({ createdAt: -1 })
        .populate("createdBy", "userName profileImageUrl role"); // Populate createdBy with userName, profileImageUrl, and role fields
  
      return res.render("home", {
        user: req.user,
        blogs: allBlogs,
      });
    } catch (err) {
      console.error("Error fetching blogs:", err);
      res.status(500).send("Error fetching blogs");
    }
  });
  

app.use("/", userRoute)
app.use("/blog", blogRoute)

app.listen(config.PORT, () => {
    console.log(`Server running on the http://localhost:${config.PORT} in ${config.NODE_ENV} mode`);
});