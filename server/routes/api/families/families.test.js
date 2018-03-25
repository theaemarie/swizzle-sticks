const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../../../server');
const {Family} = require('../../../models/family');

const families = [{
  _id: new ObjectID(),
  name: 'Cobblers'
},{
  _id: new ObjectID(), 
  name: 'Tropical Drinks'
},{
  _id: new ObjectID(),  
  name: 'Squirrel Sours',
  description: 'Squirrel Sours call for a base spirit, lemon or lime juice, and creme de noyau or another nut-flavored liqueur.'
}];

beforeEach((done) => {
  Family.remove({}).then(() => {
    return Family.insertMany(families);
  }).then(() => done());
});

describe('GET /api/families', () => {
  it('should get all families', (done) => {
    request(app)
      .get('/api/families')
      .send({})
      .expect(200)
      .expect((response) => {
        expect(response.body.families.length).toBe(families.length);
      })
      .end(done);

  });
});


describe('GET /api/families/:id', () => {
  it('should return family document', (done) => {
    request(app)
      .get(`/api/families/${families[0]._id.toHexString()}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.family.name).toBe(families[0].name);
      })
      .end(done);
  });

  it('should return 400 if invalid family id', (done) => {
    request(app)
      .get(`/api/families/invalidID`)
      .expect(400)
      .end(done);
  });

  it('should return 404 error if family not found', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .get(`/api/families/${hexId}`)
      .expect(404)
      .end(done);
    });
});

describe('POST /api/families', () => {
  it('should create a new Family', (done) => {
    var name = 'mocktail';

    //supertext request
    request(app)
      .post('/api/families')
      .send({name})
      .expect(200)
      .expect((response) =>
        expect(response.body.name).toBe(name)
      )
      .end((error, response) => {
        if (error) {
          return done(error);
        }
 
        Family.find().then((familiesDB) => {
          expect(familiesDB.length).toBe(families.length + 1);
          expect(familiesDB.pop().name).toBe(name);
          done();
        }).catch((e) => done(e));

    });
  });

  it('should not create a Family with no body data', (done) => {
    request(app)
      .post('/api/families')
      .send({})
      .expect(400)
      .end((err, response) => {
        if (err) {
          return done(err);
        }

        Family.find().then((familiesDB) => {
          expect(familiesDB.length).toBe(families.length);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('DELETE /api/families/:id', () => {
  it('should remove a family of provided id', (done) => {
    let id = families[0]._id.toHexString();
    request(app)
      .delete(`/api/families/${id}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.family._id).toBe(id);
      })
      .end((error, response) => {
        if (error) {
          return done(error);
        }

        Family.findById(id).then((family) => {
          expect(family).toBeFalsy();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 400 if invalid family id', (done) => {
    request(app)
      .delete(`/api/families/invalid`)
      .expect(400)
      .end(done);
  });

  it('should return 404 if family not found', (done) => {
    request(app)
      .delete('/api/families/${families[0]._id.toHexString()}')
      .expect(404)
      .end(done);
  });
});