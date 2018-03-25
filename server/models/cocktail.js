var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

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
  origin: String,
  family: {
    type: ObjectId
  }
});

var Cocktail = mongoose.model('Cocktail', cocktailSchema);

module.exports = {Cocktail};