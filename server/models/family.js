var mongoose = require('mongoose');


// Different Families of cocktails
var familySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  description: {
    type: String
  }
});

var Family = mongoose.model('Family', familySchema);

module.exports = {Family};