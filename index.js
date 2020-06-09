const express = require('express');
const bodyParser = require("body-parser");
var cors = require('cors')
const mongoose=require('mongoose')
const passport = require('passport')
const keys=require('./config/keys');
const app = express();
const PORT = process.env.PORT || 5000;
const cookieSession = require('cookie-session')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

require('./models/Users')
require('./models/Artwork')
require('./models/Rating')
//Import UserModel before passport
require('./services/passport');
const path = require('path')
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
// app.use('/userimages',express.static(path.join(__dirname, 'public')));

require('./routes/authRoute')(app);
require('./routes/artworkRoute')(app);
require('./routes/userRoute')(app);
require('./routes/ratingRoute')(app);
require('./routes/imageUpload')(app);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("Listening on PORT : "+PORT);
})

//mongodb+srv://curs0r:<password>@cluster0-gtriz.mongodb.net/test?retryWrites=true&w=majority

//immuneToAll