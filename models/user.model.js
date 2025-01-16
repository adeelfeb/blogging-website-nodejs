const {Schema, Mongoose} = require("mongoose")


const userSchema = new Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    salt:{
        type: String,
        required: true,
    },
    profileImageUrl:{
        type: String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.anyrgb.com%2Fen-clipart-hf1gy&psig=AOvVaw2lnzz7TLXtGj9PRvhOc2vS&ust=1737135941685000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMCL1enl-ooDFQAAAAAdAAAAABAE"
    }
}, {timestamps: true})