const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Cocktail} = require('./../server/models/cocktail');
const {User} = require('./../server/models/user');

// Remove all
// Cocktail.remove({}).then((result) => {
//   console.log(result);
// });

// Find one and Remove 
// Returns Document
Cocktail.findOneAndRemove({
  name: 'Negroni'
}).then((cocktail) => {
  if (!cocktail) {
    return console.error('No cocktail exists.');
  }
  console.log(cocktail);
});

// Find by ID and Remove
// Returns Document
// Cocktail.findByIdAndRemove('5a6412046b40ff27f8259ee1').then((cocktail) => {
//   console.log(cocktail);
// });