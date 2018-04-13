const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../../../server');
const {Ingredient} = require('../../../models/ingredient');

const ingredients = [{
  _id: new ObjectID(),
  name: 'orange juice'
},{
  _id: new ObjectID(), 
  name: 'gin'
},{
  _id: new ObjectID(),  
  name: 'amaretto'
}];

beforeEach((done) => {
  Ingredient.remove({}).then(() => {
    return Ingredient.insertMany(ingredients);
  }).then(() => done());
});

describe('GET /api/ingredients', () => {
  it('should get all ingredients', (done) => {
    request(app)
      .get('/api/ingredients')
      .send({})
      .expect(200)
      .expect((response) => {
        expect(response.body.ingredients.length).toBe(ingredients.length);
      })
      .end(done);

  });
});


describe('GET /api/ingredients/:id', () => {
  it('should return ingredient document', (done) => {
    request(app)
      .get(`/api/ingredients/${ingredients[0]._id.toHexString()}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.ingredient.name).toBe(ingredients[0].name);
      })
      .end(done);
  });

  it('should return 400 if invalid ingredient id', (done) => {
    request(app)
      .get(`/api/ingredients/invalidID`)
      .expect(400)
      .end(done);
  });

  it('should return 404 error if ingredient not found', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .get(`/api/ingredients/${hexId}`)
      .expect(404)
      .end(done);
    });
});

describe('POST /api/ingredients', () => {
  it('should create a new Ingredient', (done) => {
    var name = 'yellow Chartreuse';

    //supertext request
    request(app)
      .post('/api/ingredients')
      .send({name})
      .expect(200)
      .expect((response) =>
        expect(response.body.name).toBe(name)
      )
      .end((error, response) => {
        if (error) {
          return done(error);
        }

        Ingredient.find().then((ingredientsDB) => {
          expect(ingredientsDB.length).toBe(ingredients.length + 1);
          expect(ingredientsDB.pop().name).toBe(name);
          done();
        }).catch((e) => done(e));

    });
  });

  it('should not create a Ingredient with no body data', (done) => {
    request(app)
      .post('/api/ingredients')
      .send({})
      .expect(400)
      .end((err, response) => {
        if (err) {
          return done(err);
        }

        Ingredient.find().then((ingredientsDB) => {
          expect(ingredientsDB.length).toBe(ingredients.length);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not post an ingredient with the same name', (done) => {
    request(app)
      .post('/api/ingredients')
      .send({'name': 'orange juice'})
      .expect(400)
      .end((err, resonse) => {
        if (err) {
          return done(err);
        }

        Ingredient.find().then((ingredientsDB) => {
          expect(ingredientsDB.length).toBe(ingredients.length);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('DELETE /api/ingredients/:id', () => {
  it('should remove a ingredient of provided id', (done) => {
    let id = ingredients[0]._id.toHexString();
    request(app)
      .delete(`/api/ingredients/${id}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.ingredient._id).toBe(id);
      })
      .end((error, response) => {
        if (error) {
          return done(error);
        }

        Ingredient.findById(id).then((ingredient) => {
          expect(ingredient).toBeFalsy();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 400 if invalid ingredient id', (done) => {
    request(app)
      .delete(`/api/ingredients/invalid`)
      .expect(400)
      .end(done);
  });

  it('should return 404 if ingredient not found', (done) => {
    request(app)
      .delete('/api/ingredients/5ab66b5c98d4e0172884ee7d')
      .expect(404)
      .end(done);
  });
});