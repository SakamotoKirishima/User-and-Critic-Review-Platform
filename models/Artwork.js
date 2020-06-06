const mongoose = require('mongoose')
const Schema = mongoose.Schema

const artworkSchema = Schema({
    title:{
        type:String,
        required:true
    },
    embedded_link:{
        type:String,
        required:true
    },
    postedBy:{
        type:String,
        required:true
    },
    description:{
      type: String,
      required: false
    },
    dtu:{
      type: Date,
      required: true,
    },
    tags:[{
        type:String
    }],
    rating:{
        type:Number,
        required:true
    },
    ratingCount:{
        type:Number,
        required:true
    }
});

mongoose.model("artworks",artworkSchema);
