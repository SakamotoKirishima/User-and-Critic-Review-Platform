const mongoose = require('mongoose');
const {Schema} = mongoose;
//artwork schema

const artworkSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  embedded_link:{
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: false
  },
  dtu:{
    type: String,
    required: true
  }
});

mongoose.model('artworks', artworkSchema);
