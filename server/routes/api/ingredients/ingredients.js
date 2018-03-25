const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {ObjectID} = require('mongodb');

var {Ingredient} = require(__base + 'models/ingredient');

// /api/ingredients

router.post('/', (request, response) => {
  var ingredient = new Ingredient({
    name: request.body.name,
    description: request.body.description
  });

  ingredient.save().then((document)=> {
    response.send(document);
  }, (e) => {
    response.status(400).send(e);
  });
});

router.get('/', (request, response) => {
  Ingredient.find().then((ingredients) => {
    response.send({
      ingredients
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

  Ingredient.findById(id).then((ingredient) => {
    if (!ingredient) {
      return response.status(404).send('no ingredient');
    }
    response.send({ingredient});
  }).catch((e) => {
    response.status(400).send();;
  });

});

router.delete('/:id', (request, response) => {
  var id = request.params.id;

  if (!ObjectID.isValid(id) ) {
    return response.status(400).send();
  }

  Ingredient.findByIdAndRemove(id).then((ingredient) => {
    if (!ingredient) {
      return response.status(404).send();
    }
    response.send({ingredient});
  }).catch((e) => response.status(400).send() );
});

module.exports = router;