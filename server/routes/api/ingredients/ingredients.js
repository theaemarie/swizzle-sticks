const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {ObjectID} = require('mongodb');

var {Ingredient} = require(__base + '/models/ingredient');

// /api/ingredients

router.post('/', (request, response) => {

    var ingredient = new Ingredient({
        name: request.body.name,
        brand: request.body.brand
    });

    // Check if duplicate name exists
    // TODO: make this case insensitive
    // TODO: This doesnt feel like the cleanest/correct way to handle this.
    Ingredient.findOne({'name': ingredient.name}).then((duplicate) => {
        if (duplicate !== null)
            return response.status(400).send(`Ingredient with name '${ingredient.name}' already present.`)

        ingredient.save().then((document)=> {
            return response.send(document);
        }, (e) => {
            return response.status(400).send(e);
        });

    }, (err) => {
        return response.status(400).send(e);
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

router.patch('/:id', (request, response) => {
    var id = request.params.id,
        body = _.pick(request.body, ['name', 'brand', 'category']);

    if (!ObjectID.isValid(id) ) {
        return response.status(400).send();
    }

    body.updatedAt = new Date().getTime();

    Ingredient.findByIdAndUpdate(id, {$set: body}, {
        new: true
    }).then((ingredient) => {
        if (!ingredient) return response.status(404).send();

        response.send({ingredient});

    }).catch((e) => {
        response.status(400).send();
    });
});

module.exports = router;