const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const seeders = require('../config/seeders.config');
require('dotenv').config();
const NodeEnv = process.env.NODE_ENV;

chai.should();
chai.use(chaiHttp);

const authorizationHeader = 'Bearer ' + process.env.test_user_token;

describe(`${seeders[NodeEnv].server_name} - Wallet and Payment Integration tests`, () => {
  describe('Post /api/v1/wallet/fundWallet', function () {
    this.timeout(10000);
    it('It should FUND a user wallet', (done) => {
      const payload = {
        card: {
          card_number: '5399838383838381',
          cvv: '470',
          expiry_month: '10',
          expiry_year: '31',
        },
        amount: 1000,
        currency: 'NGN',
        pin: '3310',
      };
      chai
        .request(app)
        .post('/api/v1/wallet/fundWallet')
        .set('Authorization', authorizationHeader)
        .send(payload)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          done();
        });
    });
    it('It should NOT FUND a user that failed validation', (done) => {
      const payload = {
        card: {
          card_number: '74748484',
          cvv: '470',
          expiry_month: '10',
          expiry_year: '31',
        },
        amount: 1000,
        currency: 'NGN',
        pin: '3310',
      };
      chai
        .request(app)
        .post('/api/v1/wallet/fundWallet')
        .set('Authorization', authorizationHeader)
        .send(payload)
        .end((err, response) => {
          response.should.have.status(409);
          done();
        });
    });
  });
  describe('Post /api/v1/wallet/transferFund', function () {
    this.timeout(5000);
    it('It should TRANSFER FUNDS to a user', (done) => {
      const payload = {
        amount: 1000,
        account_number: '9471907445',
        account_bank: 'Oladipo Credit Bank',
      };
      chai
        .request(app)
        .post('/api/v1/wallet/transferFund')
        .set('Authorization', authorizationHeader)
        .send(payload)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          done();
        });
    });
    it('It should NOT TRANSFER FUNDS prior to failed validation', (done) => {
      const payload = {
        amount: 1000,
        account_number: '94719074450',
        account_bank: 'Oladipo Credit Bank',
      };
      chai
        .request(app)
        .post('/api/v1/wallet/transferFund')
        .set('Authorization', authorizationHeader)
        .send(payload)
        .end((err, response) => {
          response.should.have.status(409);
          done();
        });
    });
  }),
    describe('Get /api/v1/wallet/getTransactions', function () {
      this.timeout(5000);
      it('It should get ALL TRANSACTIONS of a user', (done) => {
        chai
          .request(app)
          .get('/api/v1/wallet/getTransactions')
          .set('Authorization', authorizationHeader)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            done();
          });
      });
    }),
    describe('Post /api/v1/wallet/withdrawFund', function () {
      this.timeout(10000);
      it('It should WIThDRAW FUNDS to a user NGN B/ACCOUNT', (done) => {
        const payload = {
          amount: 1000,
          account_number: '0690000040',
          account_bank: '044',
        };
        chai
          .request(app)
          .post('/api/v1/wallet/withdrawFund')
          .set('Authorization', authorizationHeader)
          .send(payload)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            done();
          });
      });
      it('It should NOT WIThDRAW FUNDS to a user NGN B/ACCOUNT', (done) => {
        const payload = {
          amount: 0,
          account_number: '94719074450',
          account_bank: 'Oladipo Credit Bank',
        };
        chai
          .request(app)
          .post('/api/v1/wallet/withdrawFund')
          .set('Authorization', authorizationHeader)
          .send(payload)
          .end((err, response) => {
            response.should.have.status(409);
            done();
          });
      });
    });
});
