const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema=new Schema({
     googleId:String,
    userName:String,
    picture:String,
    displayName:String,
    dateOfJoining:Date,
    googleMail:String,
    genderType:String
})

mongoose.model("users",userSchema);