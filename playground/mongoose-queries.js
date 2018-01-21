const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Cocktail} = require('./../server/models/cocktail');
const {User} = require('./../server/models/user');

// No need to create Object Id
// ie: new ObjectID();
// var id = '5a5ffc0f93056915acb1c390';

// valid id, but not in DB
// (no error thrown)
// var id = '6a5ffc0f93056915acb1c390';

// invalid id
// var id = 'invalid';

// can check w/method to determine validity
// if ( !ObjectID.isValid(id) ) {
//   console.log('ID not validd.');
// }

// // Find all
// Cocktail.find({
//   _id: id
// }).then((cocktails) => {
//   if ( cocktails.length === 0 ) {
//     return console.error('Cocktails not found.');
//   }
//   console.log('Cocktails', cocktails);
// }).catch((error) => console.error('Error:', error.message) );

// //one document at MOST
// Cocktail.findOne({
//   _id: id
// }).then((cocktail) => {
//   if (!cocktail) {
//     return console.error('Cocktail not found.');
//   }
//   console.log('Cocktail', cocktail);
// }).catch((error) => console.error('Error:', error.message) );


// //look for document by id
// Cocktail.findById(id).then((cocktail) => {
//   if (!cocktail) {
//     return console.error('Id not found.');
//   }
//   console.log('Cocktail By Id', cocktail);
// }).catch((error) => console.error('Error:', error.message) );



////

function getUserId(id) {
  if ( !ObjectID.isValid(id) ) {
    return console.log('User ID not valid.');
  }
  
  User.findById(id).then((user) => {
    if (!user) {
      return console.error('User not found.');
    }
    console.log('User:', user);
  }).catch((e) => console.error('Error:', e.message));
}


// Query works, but no user
getUserId('6a5266e3671a0424f09e6adb');

// user was found, print to screen.
getUserId('5a5266e3671a0424f09e6adb');

// user id not valid
getUserId('za5266e3671a0424f09e6adb');