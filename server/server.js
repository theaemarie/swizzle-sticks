global.__base = __dirname + '/';

require('./config/config');

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const {ObjectID} = require('mongodb');


var {mongoose} = require('./db/mongoose');
var {Ingredient} = require('./models/ingredient');
var {User} = require('./models/user.js');

var cocktails = require('./routes/api/cocktails/cocktails.js');
var families = require('./routes/api/families/families.js');
var ingredients = require('./routes/api/ingredients/ingredients.js');

var app = express();
const port = process.env.PORT;

// app.use(express.static(__dirname + '/../app'));
const viewsPath = path.join(__dirname, '..', 'app/views/');

app.set('views', viewsPath);
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: viewsPath + '/partials',
    layoutsDir: viewsPath + '/layouts'
}));
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
    res.render('index');
});

app.use('/api/ingredients', ingredients);
app.use('/api/ingredients/:id', ingredients);

app.use('/api/cocktails', cocktails);
app.use('/api/cocktails/:id', cocktails);

app.use('/api/families', families);
app.use('/api/families/:id', families);


/**
 * START APP
 */
app.listen(port, () => {
  console.log(`Started up on port ${port}.`);
});

module.exports = {app};
