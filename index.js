//  index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const config = require('./config/database')
const passport = require('passport')

mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://baasit_8:YShg6Dw98hW2Mh0y@cluster0-mvtbq.mongodb.net/test?retryWrites=true&w=majority`);
mongoose.connect(config.database)
let db = mongoose.connection;

//Check connection
db.once('open', function(){
  console.log('Connected to MongoDB')
});

//Check for DB errors
db.on('error', function(err){
  console.log(err);
});

//Import Models
require('./models/artwork.js');
require('./models/users.js');
require('./models/rating.js');

//init app
const app = express();

app.use(bodyParser.json());

//Express Session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}));

//Express Messages middleware
app.use(require('connect-flash')());
app.use(function(req,res,next){
  res.locals.messages = require('express-messages')(req,res);
  next();
});

//Express Validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

//Import Routes
// require('./routes/artworkRoutes.js')(app);
let artworkRoute = require('./routes/artworkRoutes.js')
app.use(artworkRoute)
let userRoute = require('./routes/userRoutes.js')
app.use(userRoute)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});
