const mongoose= require('mongoose')
const Rating = mongoose.model('ratings')
const User = mongoose.model('users')
const Artwork = mongoose.model('artworks')

module.exports=(app)=>{
    app.post('/api/rating/rateartwork',(req,res)=>{

        Rating.findOne({title:req.body.title,
            postedBy:req.body.postedBy,
            ratedBy:req.body.ratedBy}).then((existingRating)=>{
                if(existingRating){
                    const delta = req.body.rating-existingRating.rating;
                    Rating.update({title:req.body.title,
                        postedBy:req.body.postedBy,
                        ratedBy:req.body.ratedBy},{
                            rating:req.body.rating,
                            review:req.body.review
                        }).then(()=>{
                            console.log("done");
                        });
                    Artwork.update({title:req.body.title,postedBy:req.body.postedBy},{
                        $inc:{rating:delta}
                    }).then(()=>{
                        res.send('SUCCESS')
                    })
                }
                else{
                    var ratingDoc =new Rating({
                        title:req.body.title,
                        postedBy:req.body.postedBy,
                        ratedBy:req.body.ratedBy,
                        rating:req.body.rating,
                        review:req.body.review,
                        dtu:Date.now()
                    });
                    ratingDoc.save(function(err){
                        if (err){
                            return res.status(422).send(err);
                        }
                    });
                    Artwork.update({title:req.body.title,postedBy:req.body.postedBy},{
                        $inc:{ratingCount:1,rating:req.body.rating}
                    }).then(()=>{
                        res.send('SUCCESS')
                    })
                }
            })
            
    })
}

