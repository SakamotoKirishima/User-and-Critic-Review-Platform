const mongoose= require('mongoose')
const User = mongoose.model('users')
const Rating = mongoose.model('ratings')
const Artwork = mongoose.model('artworks')

module.exports = (app)=>{


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
                        prevName = existingUser.displayName;
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
                    var newvalues = {$set: {postedBy: req.params.newDispName} };
                    var myquery2 = { ratedBy: prevName };
                    var newvalues2 = {$set: {ratedBy: req.params.newDispName} };
                    Rating.updateMany(myquery,newvalues,{upsert: false},function(err,result){
                    if (err) throw err;
                        Rating.updateMany(myquery2,newvalues2,{upsert: false},function(err,result){
                            if (err) throw err;
                            Artwork.updateMany(myquery,newvalues,{upsert: false},function(err,result){
                                if (err) throw err;
                                res.send(req.params.newDispName);
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
    app.get('/api/user/all',(req,res)=>{
        User.find({},function(err,users){
            if(err)
                return res.send(err)
            else
                return res.send(users)
        })
    })
    app.get('/api/user/profileimg/:name',(req,res)=>{
        const name = decodeURI(req.params.name)
        User.findOne({displayName:name},function(err,user){
            console.log(err)
            var pic='https://wemapshare.com/images/users/anon.jpg';
            if(user)
                pic= user.picture;
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
        var name;
        User.findOne({googleId:req.params.id},function(err,result){
            if (err) throw err;
            else {
                name = result.displayName;
                User.findOneAndDelete({googleId:req.params.id}).then(
                    Rating.deleteMany({postedBy:name},function(err,result){
                        console.log(result);
                        Rating.deleteMany({ratedBy:name},function(err,result){
                            console.log(result)
                            Artwork.deleteMany({postedBy:name},function(err,result){
                                res.redirect('/')
                            })
                        })
                    })
                )
            }
        })
        // User.findOneAndDelete({googleId:req.params.id}).then(
            
        //     res.redirect('/')
        // )
    })

}