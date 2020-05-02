//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const rute = require('../rute'),
  saleUpiti = require('../modules/sale/server/upiti.servis'),
  osobljeUpiti = require('../modules/osoba/server/upiti.servis'),
  dbSetup = require('../modules/core/server/database/dbSetup')

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let expect = chai.expect;


chai.use(chaiHttp);
describe('Rezervacije', () => {
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
  describe('/GET rezervacije', () => {
      it('trebalo bi dobaviti sve rezervacije', (done) => {
        chai.request(server)
            .get(rute.rezervacije.bazna)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
              done();
            });
      });
  });

  describe('/POST rezervacije', () => {
    it('trebalo bi da vrati uspjeh, ispravne informacije o rezervaciji poslate, vraca novu listu sa dodatom informacijom', (done) => {
      let rezervacija = {
          "datum": '01.01.2020',
          "pocetak": '13:30',
          "kraj": '15:00',
          "naziv": "1",
          "periodicna": false,
          "predavac": "1"
      }
      // Kreiranje osobe i sale
      const osoba = {ime:'Neko', prezime: 'Nekić', uloga: 'profesor'};

      osobljeUpiti.dodajOsobu(osoba)
        .then((neko) => {
          const sala = {naziv: '1-11', zaduzenaOsoba: neko.id };
          return saleUpiti.dodajSalu(sala)
            .then((salaKreirana) => {
              rezervacija.predavac = neko.id;
              rezervacija.naziv = salaKreirana.id;

              chai.request(server)
                .post(rute.rezervacije.bazna)
                .send(rezervacija)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('vanredna');
                  expect(res.body.vanredna).to.be.an('array');
                  expect(res.body).to.nested.include({'vanredna[0].salaId': salaKreirana.id, 'vanredna[0].pocetak': rezervacija.pocetak})
                  done();
                });
            })
        })

    });
  });

  describe('/POST rezervacije', () => {
    it('trebalo bi da vrati gresku, pokusaj dodavanja iste rezervacije od iste osobe', (done) => {
      let rezervacija = {
          "datum": '01.01.2020',
          "pocetak": '13:30',
          "kraj": '15:00',
          "naziv": "1",
          "periodicna": false,
          "predavac": "1"
      }
      // Kreiranje osobe i sale
      const osoba = {ime:'Neko', prezime: 'Nekić', uloga: 'profesor'};

      osobljeUpiti.dodajOsobu(osoba)
        .then((neko) => {
          const sala = {naziv: '1-11', zaduzenaOsoba: neko.id };
          return saleUpiti.dodajSalu(sala)
            .then((salaKreirana) => {
              rezervacija.predavac = neko.id;
              rezervacija.naziv = salaKreirana.id;

              chai.request(server)
                .post(rute.rezervacije.bazna)
                .send(rezervacija)
                .end((err, res) => {
                  chai.request(server)
                  .post(rute.rezervacije.bazna)
                  .send(rezervacija)
                  .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.eql(`Nije moguće rezervisati salu ${sala.naziv} za navedeni datum ${rezervacija.datum} i termin od ${rezervacija.pocetak} do ${rezervacija.kraj}. Salu je vec rezervisao/la: ${osoba.ime} ${osoba.prezime}!`);
                    done();
                  });
                });
            })
        })
    });
  });

  describe('/POST rezervacije', () => {
    it('trebalo bi da vrati gresku, pokusaj dodavanja iste rezervacije od razlicite osobe', (done) => {
      let rezervacija = {
          "datum": '01.01.2020',
          "pocetak": '13:30',
          "kraj": '15:00',
          "naziv": "1",
          "periodicna": false,
          "predavac": "1"
      }
      // Kreiranje osobe i sale
      const osoba = {ime:'Neko', prezime: 'Nekić', uloga: 'profesor'};
      const osoba2 = {ime:'Test', prezime: 'Testic', uloga: 'asistent'}
      Promise.all([osobljeUpiti.dodajOsobu(osoba), osobljeUpiti.dodajOsobu(osoba2)])
        .then((data) => {
          const neko = data[0];
          const test = data[1]
          const sala = {naziv: '1-11', zaduzenaOsoba: neko.id };
          return saleUpiti.dodajSalu(sala)
            .then((salaKreirana) => {
              rezervacija.predavac = neko.id;
              rezervacija.naziv = salaKreirana.id;
              const rezezervacijaOsoba2 = {...rezervacija, predavac: test.id};
              chai.request(server)
                .post(rute.rezervacije.bazna)
                .send(rezervacija)
                .end((err, res) => {
                  chai.request(server)
                  .post(rute.rezervacije.bazna)
                  .send(rezezervacijaOsoba2)
                  .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.eql(`Nije moguće rezervisati salu ${sala.naziv} za navedeni datum ${rezervacija.datum} i termin od ${rezervacija.pocetak} do ${rezervacija.kraj}. Salu je vec rezervisao/la: ${osoba.ime} ${osoba.prezime}!`);
                    done();
                  });
                });
            })
        })
    });
  });

  describe('/POST rezervacije', () => {
    it('trebalo bi da vrati gresku, pogresne informacije o rezervaciji poslate', (done) => {
      chai.request(server)
          .post(rute.rezervacije.bazna)
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