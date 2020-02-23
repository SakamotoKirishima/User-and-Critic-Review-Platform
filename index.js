//  index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/usr-critic-db`);
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

//init app
const app = express();

app.use(bodyParser.json());

//Import Routes
require('./routes/artworkRoutes.js')(app);

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
