//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const rute = require('../rute'),
  dbSetup = require('../modules/core/server/database/dbSetup')

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Sale', () => {
  before((done) => {
    dbSetup.sinhronizacijaBezInicijalizacije()
      .then(() => done());   
  })

  beforeEach((done) => { //Before each test we empty the database
    dbSetup.sinhronizacijaBezInicijalizacije()
      .then(() => done());        
  });
/*
  * Test the /GET route
  */
  describe('/GET sale', () => {
      it('trebalo bi dobaviti sve sale', (done) => {
        chai.request(server)
            .get(rute.osoblje.bazna)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });
});