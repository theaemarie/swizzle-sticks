var mongoose = require('mongoose');

// Tell mongoose which promise library we will use
mongoose.Promise = global.Promise;

// connect to database
mongoose.connect('mongodb://localhost:27017/cocktails');

// create a data model
var cocktailSchema = mongoose.Schema({
  name: String,
  ingredients: [
    {
      id: Number,
      qty: Number,
      unit: String
    }
  ]
});

var Cocktail = mongoose.model('Cocktail', cocktailSchema);

//Set data for new cocktail.
var newCocktail = new Cocktail({
  name: 'The Jasmine',
  ingredients: [
    {
      id: 1,
      qty: 1.5,
      unit: 'oz'
    },
    {
      id: 2,
      qty: 0.75,
      unit: 'oz'
    },
    {
      id: 3,
      qty: 0.25,
      unit: 'oz'
    },
    {
      id: 4,
      qty: 0.25,
      unit: 'oz'
    }
  ]
});

//Adds record to databse
newCocktail.save().then((doc) => {
  console.log('Saved cocktail.', doc);
}, (error) => {
  console.log('Unable to save cocktail.');
});