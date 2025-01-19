const { Router } = require("express");
const router = Router();
const Blog = require("../models/blog.model");
const Comment = require("../models/comment.model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");  // Import fs module
const { compare } = require("bcrypt");

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    const userDir = path.resolve(`./public/uploads/${req.user._id}`);
    
    // Check if the directory exists, create it if it doesn't
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });  // Create directory with subdirectories if needed
    }

    cb(null, userDir);  // Set the destination folder
  },
  filename: function(req, file, cb){
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);  // Set the file name
  }
});

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user
  });
});

router.get("/:id", async (req, res)=>{
    const blog = await Blog.findById(req.params.id).populate("createdBy")
    const comments = await Comment.find({blogId: req.params.id}).populate("createdBy")
    return res.render("blog", {
        blog,
        user: req.user,
        comments
    })
})


router.post("/comment/:blogId",async(req, res)=>{
    const comment = await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id
    })
    return res.redirect(`/blog/${req.params.blogId}`)
} )


router.post("/", upload.single("coverImage"), async(req, res) => {
    const { BlogBody, title } = req.body;
    // console.log(req.file)
    const blogCreated = await Blog.create({
        BlogBody,
        title,
        createdBy: req.user._id,
        coverImageUrl: `/uploads/${req.user._id}/${req.file.filename}`
    })
    .then(() => {
        return res.redirect(`/`);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error creating blog post");
    });
});

module.exports = router;
