const mongoose= require('mongoose')
const Rating = mongoose.model('ratings')
const User = mongoose.model('users')
const Artwork = mongoose.model('artworks')

module.exports=(app)=>{

    app.delete('/api/rating/removerating/:title/:postedby/:ratedby',(req,res)=>{
        const title = decodeURI(req.params.title);
        const ratedBy = decodeURI(req.params.ratedby);
        const postedBy = decodeURI(req.params.postedby);
        // var rating = Rating.findOne({title:title,ratedBy:ratedBy,postedBy:postedBy});
        // Rating.remove({_id:rating._id});
        // res.send('DELETED');
        Rating.findOneAndDelete({title:title,ratedBy:ratedBy,postedBy:postedBy},function(err,rating){
            console.log(err)
            if(err)
                return res.send(err)
            else
                return res.send('Rating Deleted Successfully')    
        })
    })

    app.post('/api/rating/rateartwork',(req,res)=>{
        Rating.findOne({title:req.body.title,
            postedBy:req.body.postedBy,
            ratedBy:req.body.ratedBy}).then((existingRating)=>{
                if(existingRating){
                    //console.log('here')
                    const delta = req.body.rating-existingRating.rating;
                    if(delta)
                    {
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
                            res.send('SUCCESSFULLY UPDATED')
                        })
                    }
                    else{
                        res.send('SAME RATING AS BEFORE');
                    }
                }
                else{
                    //console.log('babbt')
                    var ratingDoc =new Rating({
                        title:req.body.title,
                        postedBy:req.body.postedBy,
                        ratedBy:req.body.ratedBy,
                        rating:req.body.rating,
                        review:req.body.review,
                        dtu:Date.now()
                    });
                    ratingDoc.save(function(err){
                        if(err){
                            console.log(err);
                        }
                    });
                    Artwork.update({title:req.body.title,postedBy:req.body.postedBy},{
                        $inc:{ratingCount:1,rating:req.body.rating}
                    }).then(()=>{
                        return res.send('SUCCESS')
                    })
                }
            })
    })
}

