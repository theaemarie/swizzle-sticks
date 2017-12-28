const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', (error, client) => {
  if (error) {
    return console.error('Unable to connect to database server.', error);
  }
  console.log('Connected to MongoDB server');

  var db = client.db('cocktails');

  //Operators
  // https://docs.mongodb.com/manual/reference/operator/update/
  // db.collection('spirits').findOneAndUpdate(
  //   { 
  //     _id: new ObjectID('5a453d7c9eda4d74e1929b06')
  //   },{
  //     $set: {
  //       tried: true
  //     }
  //   },{
  //     returnOriginal: false
  //   }
  // ).then((result) => {
  //   console.log(result);
  // });


  //Increment
  db.collection('spirits').findOneAndUpdate(
    { 
      _id: new ObjectID('5a453d7c9eda4d74e1929b06')
    },{
      $inc: {
        bottles: 1
      }
    },{
      returnOriginal: false
    }
  ).then((result) => {
    console.log(result);
  });

  client.close();
});