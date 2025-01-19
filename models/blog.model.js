const {Schema, model} = require("mongoose");

const blogSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    BlogBody:{
        type: String,
        required: true
    },
    coverImageUrl:{
        type: String,
        required: false
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

const Blog = model("Blog", blogSchema)

module.exports = Blog