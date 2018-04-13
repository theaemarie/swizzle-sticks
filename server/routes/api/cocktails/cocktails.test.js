const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../../../server');
const {Cocktail} = require('../../../models/cocktail');

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

describe('POST /api/cocktails', () => {
  it('should create a new cocktail', (done) => {
    var name = 'mocktail',
        origin = 'Fascinating origin story';

    //supertext request
    request(app)
      .post('/api/cocktails')
      .send({name, origin})
      .expect(200)
      .expect((response) => {
        expect(response.body.name).toBe(name);
        expect(response.body.origin).toBe(origin);
      })
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
      .post('/api/cocktails')
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

describe('GET /api/cocktails', () => {

  it('should get all cocktails', (done) => {
    request(app)
      .get('/api/cocktails')
      .send({})
      .expect(200)
      .expect((response) => {
        expect(response.body.cocktails.length).toBe(cocktails.length);
      })
      .end(done);

  });
});

describe('GET /api/cocktails/:id', () => {
  it('should return cocktail document', (done) => {
    request(app)
      .get(`/api/cocktails/${cocktails[0]._id.toHexString()}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.cocktail.name).toBe(cocktails[0].name);
      })
      .end(done);
  });

  it('should return 400 if invalid cocktail id', (done) => {
    request(app)
      .get(`/api/cocktails/invalidID`)
      .expect(400)
      .end(done);
  });

  it('should return 404 error if cocktail not found', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .get(`/api/cocktails/${hexId}`)
      .expect(404)
      .end(done);
    });
});

describe('DELETE /api/cocktails/:id', () => {
  it('should remove a cocktail of provided id', (done) => {
    let id = cocktails[0]._id.toHexString();
    request(app)
      .delete(`/api/cocktails/${id}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.cocktail._id).toBe(id);
      })
      .end((error, response) => {
        if (error) {
          return done(error);
        }

        Cocktail.findById(id).then((cocktail) => {
          expect(cocktail).toBeFalsy();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 400 if invalid cocktail id', (done) => {
    request(app)
      .delete(`/api/cocktails/invalid`)
      .expect(400)
      .end(done);
  });

  it('should return 404 if cocktail not found', (done) => {
    request(app)
      .delete('/api/cocktails/5ab66b5c98d4e0172884ee7d')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /api/cockatils:id', () => {
  it('should return 400 if invalid cocktail id', (done) => {
    request(app)
      .patch(`/api/cocktails/invalid`)
      .expect(400)
      .end(done);
  });
});