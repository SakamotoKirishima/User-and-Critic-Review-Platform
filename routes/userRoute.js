const mongoose= require('mongoose')
const User = mongoose.model('users')
const Rating = mongoose.model('ratings')
const Artwork = mongoose.model('artworks')

module.exports = (app)=>{

//add if(req.user) to all

    app.put('/api/update/:id/:newDispName',(req,res)=>{
        User.findOne({displayName:req.params.newDispName})
        .then((userchk)=>{
            if(userchk)
                return res.send('Name Not Available');
            else{
                var prevName;
                User.findOne({googleId:req.params.id})
                .then((existingUser)=>{
                    if(existingUser)
                    {
                        // console.log(req.params.id)
                        prevName = existingUser.displayName;
                        // console.log(existingUser.displayName)
                        // console.log(prevName+" dwadadwada");
                        //console.log(existingUser)
                        existingUser.update(
                            {displayName:req.params.newDispName},
                            req.body,
                            function(err, result){
                                console.log(
                                    (err === null) ? req.params.newDispName: {msg: err}
                                );
                            }
                            );
                    }
                    var myquery = { postedBy: prevName };
                    // console.log(prevName)
                    var newvalues = {$set: {postedBy: req.params.newDispName} };
                    var myquery2 = { ratedBy: prevName };
                    var newvalues2 = {$set: {ratedBy: req.params.newDispName} };
                    // Rating.find({ratedBy:"Radiant"},(err,ratings)=>{
                    //     if (err) throw err;
                    //     ratings.map(rating=>{
                    //         console.log(rating)
                    //     })
                    // })
                    Rating.updateMany(myquery,newvalues,{upsert: false},function(err,result){
                    if (err) throw err;
                    // console.log(result);
                        Rating.updateMany(myquery2,newvalues2,{upsert: false},function(err,result){
                            if (err) throw err;
                            // console.log(result);
                            Artwork.updateMany(myquery,newvalues,{upsert: false},function(err,result){
                                if (err) throw err;
                                // console.log(result);
                                res.send('NAME UPDATED SUCCESSFULLY');
                            })
                        });
                    });
                    
                    
                });
                
                
                
                // Rating.updateMany(myquery,newvalues,{upsert: false},function(err,result){
                //     if (err) throw err;
                //     console.log(result);
                // });
                // Rating.updateMany(myquery2,newvalues2,{upsert: false},function(err,result){
                //     if (err) throw err;
                //     console.log(result);
                // });
                // Artwork.updateMany(myquery,newvalues,{upsert: false},function(err,result){
                //     if (err) throw err;
                //     console.log(result);
                //     res.send('OK');
                // })
                
            }
        })
    })
    app.get('/api/user/profileimg/:name',(req,res)=>{
        const name = decodeURI(req.params.name)
        User.findOne({displayName:name},function(err,user){
            console.log(err)
            const pic= user.picture;
            if(err)
                return res.send(err)
            else
                return res.send(pic)
        })
    })
    app.put('/api/updateGender/:id/:setgender',(req,res)=>{
        //console.log('ehere')
        User.findOne({googleId:req.params.id})
        .then((existingUser)=>{
            if(existingUser)
            {
                //console.log(existingUser)
                existingUser.update(
                    {genderType:req.params.setgender},
                    req.body,
                    function(err, result){
                        res.send(
                            (err === null) ? req.params.setgender: {msg: err}
                        );
                    }
                    );
            }
        })
    })

    app.delete('/api/delete/:id',(req,res)=>{
        User.findOneAndDelete({googleId:req.params.id}).then(res.redirect('/'))
    })

}