const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Cocktail} = require('./../models/cocktail');

const cocktails = [{
  name: 'French-Kiss Shooter'
},{
  name: 'Negroni'
},{
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