const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true,"Please Enter username"],
    unique: [true, "Username already exists"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true,"Please enter passwrod"],
    minlength: [6, "Password must be of minimum 6 characters"],
  },
});

UserSchema.pre("save",async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next()
})

UserSchema.methods.generateToken = function (user) {
    return jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn : "7d"})
}

UserSchema.methods.comparePassword = function (enteredPassword) {
    return  bcrypt.compare(enteredPassword, this.password);
}

module.exports =  mongoose.model('user', UserSchema);
2
