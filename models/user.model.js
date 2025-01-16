const {Schema, model} = require("mongoose")
const {createHmac, randomBytes} = require("crypto")

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
        default:"/image/default.png" 
    },
    role:{
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    }
}, {timestamps: true})


userSchema.pre("save",function (next){
    const user = this

    if(!user.isModified("password")) return

    const salt = randomBytes(16).toString()
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex')
    this.salt = salt
    this.password = hashedPassword

    next()

})

const User = model("User", userSchema)

module.exports = User