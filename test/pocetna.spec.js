//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const rute = require('../rute'),
  dbSetup = require('../modules/core/server/database/dbSetup')

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
// Ovo je potrebno iako se ne koristi direktno dodaje should na res objekat
const should = chai.should();

chai.use(chaiHttp);
describe('Osoblje', () => {
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
  describe('/GET slike', () => {
      it('trebalo bi dobaviti sve slike za dati limit', (done) => {
        const stranica = 0, limit = 3;
        chai.request(server)
            .get(rute.slike.bazna+`?page=${stranica}&limit=${limit}`)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(limit);
              done();
            });
      });
  });
});