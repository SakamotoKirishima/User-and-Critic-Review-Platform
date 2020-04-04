const mongoose = require('mongoose');
const {Schema} = mongoose;
//user schema

const userSchema = mongoose.Schema({
  username:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
  },
  gender:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  dateOfJoining:{
    type: Date,
    required: true,
    default: Date.now,
  }
});

mongoose.model('users', userSchema);
