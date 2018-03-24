const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Ingredient} = require('./models/ingredient');
var {Family} = require('./models/family');
var {Cocktail} = require('./models/cocktail');
var {User} = require('./models/user.js');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send('Cocktails');
});


app.post('/api/ingredients', (request, response) => {
  var ingredient = new Ingredient({
    name: request.body.name
  });

  ingredient.save().then((document)=> {
    response.send(document);
  }, (e) => {
    response.status(400).send(e);
  });
});

/**
 * COCKTAILS API ROUTES
 */
app.post('/api/families', (request, response) => {
  var family = new Family({
    name: request.body.name
  });

  family.save().then((document)=> {
    response.send(document);
  }, (e) => {
    response.status(400).send(e);
  });
});

app.get('/api/families', (request, response) => {
  Family.find().then((families) => {
    response.send({
      families
    });
  }, (e) => {
    response.status(400).send(e);
  });
});

app.get('/api/families/:id', (request, response) => {
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
    response.status(400).send();;
  });

});

/**
 * COCKTAILS API ROUTES
 */
app.post('/api/cocktails', (request, response) => {
  var cocktail = new Cocktail({
    name: request.body.name
  });

  cocktail.save().then((document)=> {
    response.send(document);
  }, (e) => {
    response.status(400).send(e);
  });
});

app.get('/api/cocktails', (request, response) => {
  Cocktail.find().then((cocktails) => {
    response.send({
      cocktails
    });
  }, (e) => {
    response.status(400).send(e);
  });
});

app.get('/api/cocktails/:id', (request, response) => {
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

app.delete('/api/cocktails/:id', (request, response) => {
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


/**
 * START APP
 */
app.listen(port, () => {
  console.log(`Started up on port ${port}.`);
});

module.exports = {app};
