var mongoose = require('mongoose');

// User Data Model
var userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    minlength: 1
  }
});

var User = mongoose.model('User', userSchema);

module.exports = {
  User
};