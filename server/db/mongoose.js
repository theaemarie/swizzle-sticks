var mongoose = require('mongoose');

// Tell mongoose which promise library we will use
mongoose.Promise = global.Promise;

// connect to database
mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};

