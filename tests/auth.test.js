const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const seeders = require('../config/seeders.config');
const randomStrings = require('../helpers/charactersGenerator');
require('dotenv').config();
const NodeEnv = process.env.NODE_ENV;

chai.should();
chai.use(chaiHttp);

describe(`${seeders[NodeEnv].server_name} - Account Integration tests`, () => {
  describe('Post /api/v1/auth/register', function () {
    this.timeout(5000);
    it('It should POST a new user', (done) => {
      const user = {
        name: randomStrings(),
        email: `${randomStrings()}@gmail.com`,
        username: randomStrings(),
        password: 'test1234',
      };
      chai
        .request(app)
        .post('/api/v1/auth/register')
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          done();
        });
    });
    it('It should NOT POST a new user that failed validation', (done) => {
      const user = {
        name: 'FOfkeh7P',
        email: '0iNdM7ow@gmail.com',
        username: 'oWls4Bkq',
        password: 'test1234',
      };
      chai
        .request(app)
        .post('/api/v1/auth/register')
        .send(user)
        .end((err, response) => {
          response.should.have.status(409);
          done();
        });
    });
  });
  describe('Post /api/v1/auth/login', function () {
    this.timeout(5000);
    it('It should Login a user', (done) => {
      const user = {
        email: '0iNdM7ow@gmail.com',
        password: 'test1234',
      };
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          done();
        });
    });
    it('It should NOT Login a user that failed validation', (done) => {
      const user = {
        email: '0iNdM7ow@gmail.com',
        password: 'test1234.',
      };
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, response) => {
          response.should.have.status(409);
          done();
        });
    });
  });
});
