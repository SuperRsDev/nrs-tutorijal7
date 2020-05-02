this.RezervacijaStranica = $page("Stranica rezervacija", {
    sale: "xpath: //input[name='sale']", // xpath locator
    periodicna: "xpath: //input[name='periodicna']",
    pocetak: "xpath: //input[name='pocetak']",
    kraj: "kraj: //input[name='kraj']",
    load: function () {
      this.open("../rezervacija/rezervacija.html");
      return this.waitForIt();
    },
    submit: function (sale, periodicna, pocetak, kraj) {
      this.sale.typeText(sale);
      this.periodicna.typeText(periodicna);
      this.pocetak.typeText(pocetak);
      this.kraj.typeText(kraj);
    }
  });
  // now you can use it like this
  var rezervacijaStranica = new RezervacijaStranica(driver).load();
  rezervacijaStranica.submit(["1"], false, "Meho", 2);
