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
  describe('/GET osoblje', () => {
      it('trebalo bi dobaviti svo osoblje', (done) => {
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

  describe('/GET osoblje/zauzeca', () => {
    it('trebalo bi dobaviti sva zauzeca za osoblje', (done) => {
      const datum = new Date().getTime();
      chai.request(server)
          .get(`${rute.osoblje.zauzeca}?datum=${datum}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
    });
  });

  describe('/GET osoblje/zauzeca', () => {
    it('trebalo bi vratiti gresku za neispravan datum', (done) => {
      chai.request(server)
          .get(`${rute.osoblje.zauzeca}`)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.message.should.be.eql('Nevalidan datum poslat');
            done();
          });
    });
  });

  describe('/POST osoblje', () => {
    it('trebalo bi da vrati ispravnu osobu koja je spasena', (done) => {
      const osoba = { ime: 'Neko', prezime: 'Nekic', uloga: 'profesor' };
      chai.request(server)
          .post(rute.osoblje.bazna)
          .send(osoba)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('ime');
            done();
          });
    });
  });

  describe('/POST osoblje', () => {
    it('trebalo bi da vrati gresku pogresna osoba poslata', (done) => {
      chai.request(server)
          .post(rute.osoblje.bazna)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('Neispravni podaci poslati');
            done();
          });
    });
  });

});