const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Artwork = mongoose.model('artworks')


  router.get(`/api/artwork`, async (req, res) => {
    let artworks = await Artwork.find();
    return res.status(200).send(artworks);
  });

  // Add Submit POST Route
  router.post('/api/artwork/add', function(req, res){
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
          // res.send('Success');
          res.redirect('/api/artwork');
        }
      });
    // }
  });

//Delete Artwork
  router.delete('/api/delete/:id', function(req, res){
  // if(!req.user._id){
  //   res.status(500).send();
  // }

  let query = {_id:req.params.id}

  Artwork.findById(req.params.id, function(err){
    // if(article.author != req.user._id){
    //   res.status(500).send();
    // } else {
      Artwork.remove(query, function(err){
        if(err){
          console.log(err);
        }
        res.send('Success');
      // });
    // }
    });
  });
});

router.post('/api/artwork/edit/:id', function(req, res){
  let artwork = {};
  artwork.title = req.body.title;
  artwork.embedded_link = req.body.embedded_link;
  artwork.author = req.body.author;
  artwork.description = req.body.description;
  artwork.dtu = req.body.dtu;

  let query = {_id:req.params.id}

  Artwork.update(query, artwork, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      // req.flash('success', 'Artwork Updated');
      // res.send('Success');
      res.redirect('/api/artwork');
    }
  });
});

module.exports = router;
