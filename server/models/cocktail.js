var mongoose = require('mongoose');

// Cocktail Data model
var cocktailSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  ingredients: [
    {
      id: {
        type: Number,
        required: true
      },
      qty: Number,
      unit: String
    }
  ],
  origin: String
  // family: {
  //   type: ??
  // }
});

var Cocktail = mongoose.model('Cocktail', cocktailSchema);

module.exports = {Cocktail};