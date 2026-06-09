const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,"Please fill valid email"],
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    userRole:{
        type:String,
        required:true,
        default:'CUSTOMER'
    },
    userStatus:{
        type:String,
        required:true,
        default:"APPROVED"
    }
},{timestamps:true});

userSchema.pre("save",async function(){
    const hash = await bcrypt.hash(this.password,10);
    this.password = hash;
    
})

userSchema.methods.isValidPassword = async function(plainPassword){
    const currentUser = this;
    const compare = await bcrypt.compare(plainPassword,currentUser.password);
    return compare;
}

const User = mongoose.model("User",userSchema);

module.exports = User