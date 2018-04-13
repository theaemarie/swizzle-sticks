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

  //.find() returns a 'cursor' (reference to data)
  // db.collection('spirits').find({
  //   _id: new ObjectID('5a45275a9eda4d74e1929799')
  // }).toArray().then((docs) => {
  //   console.log('spirits');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (error) => {
  //   console.error('Unable to fetch spirits.', error);
  // });

  db.collection('spirits').find().count()
    .then((count) => {
      console.log(`Spirits count: ${count}`);
    }, (error) => {
      console.error('Spirits can not be counted.', error);
    });


  client.close();
});