var mongoose = require('mongoose');

var ingredientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  brand: {
    type: String
  },
  family: {
    type: String
  }
});

var Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = {
  Ingredient
};