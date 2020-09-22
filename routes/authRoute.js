const passport = require('passport');
const mongoose= require('mongoose')
const User = mongoose.model('users')

module.exports = (app)=>{

    app.get('/auth/google',passport.authenticate('google',{
        scope:['profile','email']
    }))
    
    app.get('/auth/google/callback',passport.authenticate('google'),(req,res)=>{
        res.redirect('/profile')
    })

    app.get('/api/current_user',(req,res)=>{
        if(!req.user)
            res.send('ERROR : REQUEST NOT AUTHENTICATED');
        else{
            res.send(req.user);
        }
    })

    app.get('/api/logout',(req,res)=>{
        req.logout();
        res.redirect('/');
    })
}

