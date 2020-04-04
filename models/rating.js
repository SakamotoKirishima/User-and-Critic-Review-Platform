const mongoose = require('mongoose');
const {Schema} = mongoose;
//artwork schema

const ratingSchema = mongoose.Schema({
  artwork_id:{
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  rating:{
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  review:{
    type: String,
    required: false
  },
  dtu:{
    type: String,
    required: true
  }
});

mongoose.model('ratings', ratingSchema);
