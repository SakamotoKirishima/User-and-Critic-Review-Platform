const passport = require('passport')
const mongoose = require('mongoose')
const Rating = mongoose.model('ratings')
const Artwork = mongoose.model('artworks')

module.exports = (app)=>{
    
//Add if(req.user) to all later

    app.get('/api/artworks',(req,res)=>{
        console.log(req.user)
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

    app.get('/api/artwork/byuser',(req,res)=>{
        Artwork.find({postedBy:req.body.postedBy},function(err,artworks){
            if(err){
                return res.send(err)
           }
           else{
               return res.send(artworks);
           }
        });
    });

    app.get('/api/artwork/byname',(req,res)=>{
        Artwork.find({title:{$regex:req.body.title,$options:'$i'}},function(err,artworks){
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
        // res.send('OK')
    })

    app.post('/api/addartwork',(req,res)=>{
        console.log(req.body)
        Artwork.find({title:req.body.title,postedBy:req.body.postedBy},function(err,artworks){
            //console.log(artworks.length)
            if(err){
                 return res.send(err)
            }
            else if(artworks.length){
                return res.send('UPLOADED SAME ARTWORK BEFORE');
            }
            else {
                // console.log(req.body.tags)
                // res.send('OK')
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
        //if(Artwork.find({title:req.body.title,postedBy:req.body.postedBy}).count()==0){
            // new Artwork({
            //     title:req.body.title,
            //     embedded_link:req.body.embedded_link,
            //     postedBy:req.body.postedBy,
            //     description:req.body.description,
            //     dtu:Date.now()
            // }).save().then((artwork)=>{
            //     res.send("SUCCESS")
            // })
            
        //}
        //else
        //{
         //   res.send('')
        //}
    });

    app.delete('/api/deleteartwork/:title/:postedby',(req,res)=>{
        const title = decodeURI(req.params.title);
        const postedBy= decodeURI(req.params.postedby);
        // console.log(title)
        // res.send('OK')
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