const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {ObjectID} = require('mongodb');

var {Family} = require(__base + '/models/family');

// /api/families

router.post('/', (request, response) => {
  var family = new Family({
    name: request.body.name,
    description: request.body.description
  });

  family.save().then((document)=> {
    response.send(document);
  }, (e) => {
    response.status(400).send(e);
  });
});

router.get('/', (request, response) => {
  Family.find().then((families) => {
    response.send({
      families
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

  Family.findById(id).then((family) => {
    if (!family) {
      return response.status(404).send('no family');
    }
    response.send({family});
  }).catch((e) => {
    response.status(400).send();
  });

});

router.delete('/:id', (request, response) => {
  var id = request.params.id;

  if (!ObjectID.isValid(id) ) {
    return response.status(400).send();
  }

  Family.findByIdAndRemove(id).then((family) => {
    if (!family) {
      return response.status(404).send();
    }
    response.send({family});
  }).catch((e) => response.status(400).send() );
});

module.exports = router;