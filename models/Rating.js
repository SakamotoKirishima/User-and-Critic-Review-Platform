const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ratingSchema = Schema({
    title:{
        type:String,
        required:true
    },
    postedBy:{
        type:String,
        required:true
    },
    ratedBy:{
        type:String,
        required:true
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
        type: Date,
        required: true
      }
});

ratingSchema.index({postedBy: 1, ratedBy:1,title :1},{unique:true});   

mongoose.model("ratings",ratingSchema);