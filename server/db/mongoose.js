var mongoose = require('mongoose');

// Tell mongoose which promise library we will use
mongoose.Promise = global.Promise;

// connect to database
mongoose.connect('mongodb://localhost:27017/cocktails');

module.exports = {
  mongoose
};