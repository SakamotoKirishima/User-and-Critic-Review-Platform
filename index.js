const express = require('express');
var cors = require('cors')
const mongoose=require('mongoose')
const passport = require('passport')
const keys=require('./config/keys');
const app = express();
const PORT = process.env.PORT || 5000;
const cookieSession = require('cookie-session')

app.use(cors());

require('./models/Users')
//Import UserModel before passport
require('./services/passport');

//Connect to mongoose
mongoose.connect(keys.mongoURI,()=>{
    console.log("Conneted to MongoDB database")
})

app.use(
    cookieSession({
        maxAge:30*24*3600*1000,//30 days life
        keys:[keys.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoute')(app);

app.get('/',(req,res)=>{
    res.send('wadup');
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("Listening on PORT : "+PORT);
})

//mongodb+srv://curs0r:<password>@cluster0-gtriz.mongodb.net/test?retryWrites=true&w=majority

//immuneToAll