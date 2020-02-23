const mongoose = require('mongoose');
const express = require('express');
//const router = express.Router();

const Artwork = mongoose.model('artworks')

module.exports = (app) => {

  app.get(`/api/artwork`, async (req, res) => {
    let artworks = await Artwork.find();
    return res.status(200).send(artworks);
  });

  // Add Submit POST Route
  app.post('/api/artwork/add', function(req, res){
    // req.checkBody('title','Title is required').notEmpty();
    // req.checkBody('embedded_link','Embedded link is required').notEmpty();
    // //req.checkBody('author','Author is required').notEmpty();
    // req.checkBody('description','Description is required').notEmpty();

  // Get Errors
    // let errors = req.validationErrors();

    // if(errors){
    //   res.render('add_artwork', {
    //     title:'Add artwork',
    //     errors:errors
    //   });
    //   } else {
        let artwork = new Artwork();
        artwork.title = req.body.title;
        artwork.embedded_link = req.body.embedded_link;
        artwork.author = req.body.author;
        artwork.description = req.body.description;
        artwork.dtu = req.body.dtu;

        artwork.save(function(err){
        if(err){
          console.log(err);
          return;
        } else {
          // req.flash('success','Artwork Added');
          res.redirect('/api/artwork');
        }
      });
    // }
  });
}
