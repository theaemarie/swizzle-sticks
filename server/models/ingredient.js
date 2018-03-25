var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

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
  category: {
    type: ObjectId
  }
});

var Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = {
  Ingredient
};