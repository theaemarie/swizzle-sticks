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


  //deleteMany
  // db.collection('spirits').deleteMany({name: 'tequila'})
  // .then((result) => {
    // console.log(`${result.result.n} documents deleted.`);
  // });

  //deleteOne
  // db.collection('spirits').deleteOne({name: 'tequila'})
  //   .then((result) => {
  //     console.log(`${result.result.n} documents deleted.`);
  //   });

  //findOneAndDelete
  //returns the actual record that was deleted as well.
  // db.collection('spirits').findOneAndDelete({name: 'tequila'})
  //   .then((result) => {
  //     console.log(result);
  //   });

  db.collection('spirits').findOneAndDelete({_id: new ObjectID('5a450e36af9f32289c64b638')})
    .then((result) => {
      console.log(`${result.value.name} deleted.`);
    }, (error) => {
      console.error('There was an error deleting this record.');
    });

  client.close();
});