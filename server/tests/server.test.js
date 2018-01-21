const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Cocktail} = require('./../models/cocktail');

const cocktails = [{
  _id: new ObjectID(),
  name: 'French-Kiss Shooter'
},{
  _id: new ObjectID(), 
  name: 'Negroni'
},{
  _id: new ObjectID(),  
  name: 'Americano'
}];

beforeEach((done) => {
  Cocktail.remove({}).then(() => {
    return Cocktail.insertMany(cocktails);
  }).then(() => done());
});

describe('POST /cocktails', () => {
  it('should create a new cocktail', (done) => {
    var name = 'mocktail';

    //supertext request
    request(app)
      .post('/cocktails')
      .send({name})
      .expect(200)
      .expect((response) =>
        expect(response.body.name).toBe(name)
      )
      .end((error, response) => {
        if (error) {
          return done(error);
        }

        Cocktail.find().then((cocktailsDB) => {
          expect(cocktailsDB.length).toBe(cocktails.length + 1);
          expect(cocktailsDB.pop().name).toBe(name);
          done();
        }).catch((e) => done(e));

    });
  });

  it('should not create a cocktail with no body data', (done) => {
    request(app)
      .post('/cocktails')
      .send({})
      .expect(400)
      .end((err, response) => {
        if (err) {
          return done(err);
        }

        Cocktail.find().then((cocktailsDB) => {
          expect(cocktailsDB.length).toBe(cocktails.length);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /cocktails', () => {

  it('should get all cocktails', (done) => {
    request(app)
      .get('/cocktails')
      .send({})
      .expect(200)
      .expect((response) => {
        expect(response.body.cocktails.length).toBe(cocktails.length);
      })
      .end(done);

  });
});

describe('GET /cocktails/:id', () => {
  it('should return cocktail document', (done) => {
    request(app)
      .get(`/cocktails/${cocktails[0]._id.toHexString()}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.cocktail.name).toBe(cocktails[0].name);
      })
      .end(done);
  });

  it('should return 400 if invalid cocktail id', (done) => {
    request(app)
      .get(`/cocktails/invalidID`)
      .expect(400)
      .end(done);
  });

  it('should return 400 error if cocktail not found', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .get(`/cocktails/${hexId}`)
      .expect(400)
      .end(done);
    });
});