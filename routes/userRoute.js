const mongoose= require('mongoose')
const User = mongoose.model('users')

module.exports = (app)=>{

//add if(req.user) to all

    app.put('/api/update/:id/:newDispName',(req,res)=>{
        User.findOne({displayName:req.params.newDispName})
        .then((userchk)=>{
            if(userchk)
                return res.send('Name Not Available');
            else{
                User.findOne({googleId:req.params.id})
                .then((existingUser)=>{
                    if(existingUser)
                    {
                        //console.log(existingUser)
                        existingUser.update(
                            {displayName:req.params.newDispName},
                            req.body,
                            function(err, result){
                                res.send(
                                    (err === null) ? req.params.newDispName: {msg: err}
                                );
                            }
                            );
                    }
                })
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