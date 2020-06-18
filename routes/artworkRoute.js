const passport = require('passport')
const mongoose = require('mongoose')
const Rating = mongoose.model('ratings')
const Artwork = mongoose.model('artworks')

module.exports = (app)=>{
    
//Add if(req.user) to all later

    app.get('/api/artworks',(req,res)=>{
        // console.log(req.user)
        //if(!req.user)
        //    res.send('ERROR : REQUEST NOT AUTHENTICATED');
        Artwork.find({},function(err,artworks){
            if(err){
                 return res.send(err)
            }
            else {
                return res.json({artworks:artworks});
            }
        });
    });
    app.get('/api/artwork/rank/:id',(req,res)=>{

        Artwork.find({},function(err,artworks){
            if(err){
                 return res.send(err)
            }
            else {
                artworks = (artworks.sort((a, b) => -parseFloat(a.rating+1)/parseFloat(a.ratingCount) + parseFloat(b.rating+1)/parseFloat(b.ratingCount)));
                // res.send(artworks);
                for(i=0;i<artworks.length;i++){
                    if(artworks[i]['_id']==req.params.id){
                        return res.send(`${i+1}`);
                    }
                }
            }
        });
    })
    app.get('/api/artwork/:id',(req,res)=>{
        // console.log(req.user)
        //if(!req.user)
        //    res.send('ERROR : REQUEST NOT AUTHENTICATED');
        Artwork.findOne({_id:req.params.id},function(err,artwork){
            if(err){
                 return res.send(err)
            }
            else {
                return res.json(artwork);
            }
        });
    });

    app.get('/api/artwork/byuser/:postedBy',(req,res)=>{
        // console.log(req.params)
        Artwork.find({postedBy:req.params.postedBy},function(err,artworks){
            if(err){
                return res.send(err)
           }
           else{
               return res.send(artworks);
           }
        });
    });

    app.get('/api/artwork/byname/:name',(req,res)=>{
        Artwork.find({title:{$regex:req.params.name,$options:'$i'}},function(err,artworks){
            if(err){
                return res.send(err)
           }
           else{
               return res.send(artworks);
           }
        });
    });

    app.get('/api/artwork/bytag/:strict',(req,res)=>{
        // console.log(req.params.strict)
        // console.log(req.body.tags)
        if(req.params.strict==='true')
        {
            Artwork.find({tags:{$all:req.body.tags}},function(err,artworks){
                if(err){
                    return res.send(err)
               }
               else{
                   return res.send(artworks);
               }
            })
        }
        else if(req.params.strict==='false')
        {
            // console.log("here?");
            Artwork.find({tags:{ $all:req.body.tags}},function(err,artworks){
                if(err){
                    return res.send(err)
               }
               else{
                   return res.send(artworks);
               }
            }).collation({locale:'en_US',strength:2})
        } 
    })

    app.post('/api/addartwork',(req,res)=>{
        Artwork.find({title:req.body.title,postedBy:req.body.postedBy},function(err,artworks){
            if(err){
                 return res.send(err)
            }
            else if(artworks.length){
                return res.send('UPLOADED SAME ARTWORK BEFORE');
            }
            else {
                new Artwork({
                        title:req.body.title,
                        embedded_link:req.body.embedded_link,
                        postedBy:req.body.postedBy,
                        description:req.body.description,
                        dtu:Date.now(),
                        tags:req.body.tags,
                        rating:-1,
                        ratingCount:0
                    }).save().then(()=>{
                        res.send("SUCCESS")
                    })
            }
        });
    });

    app.get('/api/artwork/artworkimg/:title/:postedBy',(req,res)=>{
        const title = decodeURI(req.params.title);
        const postedBy= decodeURI(req.params.postedBy);
        Artwork.find({title:title,postedBy:postedBy},function(err,artwork){
            if(err){
                return res.send(err);
            }
            else{
                return res.send(artwork[0].embedded_link)
            }
        })
    })

    app.delete('/api/deleteartwork/:title/:postedby',(req,res)=>{
        const title = decodeURI(req.params.title);
        const postedBy= decodeURI(req.params.postedby);
        // console.log(title)
        // res.send('OK')
        
        console.log(title);
        console.log(postedBy)
        Artwork.deleteOne({title:title,postedBy:postedBy},function(err,artwork){
            if(err){
                return res.send(err)
            }
            else{
                Rating.remove({title:title,postedBy:postedBy},function(err,artwork){
                    if(err){
                        return res.send(err)
                    }
                    else{
                        return res.send('Artwork Successfully Deleted')
                    }
                })
            }
        });
    });
}