const {MongoClient, ObjectID} = require('mongodb');

// create object ID
// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017', (error, client) => {
  if (error) {
    return console.error('Unable to connect to database server.', error);
  }
  console.log('Connected to MongoDB server');

  var db = client.db('cocktails');


  // db.collection('spirits').insertOne({
  //   'name': 'gin'
  // }, (error, result) => {
  //   if (error) {
  //     return console.error('Unable to insert spirit', error);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2))
  // });

  // Insert new doc into Users collection (name, etc)

  // db.collection('users').insertOne({
  //   'name': 'Amy'
  // }, (error, result) => {
  //   if (error) {
  //     return console.error('Unable to insert user.', error);
  //   }
  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  client.close();
});