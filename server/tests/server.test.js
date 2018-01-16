const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Cocktail} = require('./../models/cocktail');

beforeEach((done) => {
  Cocktail.remove({}).then(() => done() );
});

describe('POST /cocktails', () => {
  it('should create a new cocktail', (done) => {
    var name = 'mocktail';

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

        Cocktail.find().then((cocktails) => {
          expect(cocktails.length).toBe(1);
          expect(cocktails[0].name).toBe(name);
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

        Cocktail.find().then((cocktails) => {
          expect(cocktails.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });
});