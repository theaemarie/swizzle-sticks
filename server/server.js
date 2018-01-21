const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Ingredient} = require('./models/ingredient');
var {Family} = require('./models/family');
var {Cocktail} = require('./models/cocktail');
var {User} = require('./models/user.js');

var app = express();

app.use(bodyParser.json());

app.post('/cocktails', (request, response) => {
  var cocktail = new Cocktail({
    name: request.body.name
  });

  cocktail.save().then((document)=> {
    response.send(document);
  }, (e) => {
    response.status(400).send(e);
  });
});

app.post('/ingredients', (request, response) => {
  var ingredient = new Ingredient({
    name: request.body.name
  });

  ingredient.save().then((document)=> {
    response.send(document);
  }, (e) => {
    response.status(400).send(e);
  });
});

app.post('/families', (request, response) => {
  var family = new Family({
    name: request.body.name
  });

  family.save().then((document)=> {
    response.send(document);
  }, (e) => {
    response.status(400).send(e);
  });
});

app.get('/cocktails', (request, response) => {
  Cocktail.find().then((cocktails) => {
    response.send({
      cocktails
    });
  }, (e) => {
    response.status(400).send(e);
  });
});

app.get('/cocktails/:id', (request, response) => {
  var id = request.params.id;

  if ( !ObjectID.isValid(id) ) {
    return response.status(400).send();
  }

  Cocktail.findById(id).then((cocktail) => {
    if (!cocktail) {
      return response.status(400).send('no cocktail');
    }
    response.send({cocktail});
  }).catch((e) => {
    response.status(400).send();;
  });

});

app.listen(3000, () => {
  console.log('Started on port 3000.');
});

module.exports = {app};
