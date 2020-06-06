const mongoose= require('mongoose')
const User = mongoose.model('users')

module.exports = (app)=>{

//add if(req.user) to all


    app.put('/api/update/:id/:newDispName',(req,res)=>{
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
    })

    app.delete('/api/delete/:id',(req,res)=>{
        User.findOneAndDelete({googleId:req.params.id}).then(res.redirect('/'))
    })

}