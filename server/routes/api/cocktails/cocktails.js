const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {ObjectID} = require('mongodb');

var {Cocktail} = require(__base + 'models/cocktail');

var userModifiableFields = ['name', 'ingredients', 'origin', 'family'];

// /api/cocktails
router.post('/', (request, response) => {
  var cocktail = new Cocktail({
    name: request.body.name,
    origin: request.body.origin,
    family: request.body.family
  });

  cocktail.save().then((document)=> {
    response.send(document);
  }, (e) => {
    response.status(400).send(e);
  });
});

router.get('/', (request, response) => {
  Cocktail.find().then((cocktails) => {
    response.send({
      cocktails
    });
  }, (e) => {
    response.status(400).send(e);
  });
});

router.get('/:id', (request, response) => {
  var id = request.params.id;

  if ( !ObjectID.isValid(id) ) {
    return response.status(400).send();
  }

  Cocktail.findById(id).then((cocktail) => {
    if (!cocktail) {
      return response.status(404).send('no cocktail');
    }
    response.send({cocktail});
  }).catch((e) => {
    response.status(400).send();;
  });

});

router.delete('/:id', (request, response) => {
  var id = request.params.id;

  if (!ObjectID.isValid(id) ) {
    return response.status(400).send();
  }

  Cocktail.findByIdAndRemove(id).then((cocktail) => {
    if (!cocktail) {
      return response.status(404).send();
    }
    response.send({cocktail});
  }).catch((e) => response.status(400).send() );
});

router.patch('/:id', (request, response) => {
  var id = request.params.id;
  var body = _.pick(request.body, userModifiableFields);

  if ( !ObjectID.isValid(id) ) {
    return response.status(400).send();
  }

  return response.status(200).send();
});

module.exports = router;