this.UnosStranica = $page("Stranica unos", {
    naziv: "xpath: //input[name='naziv']", // xpath locator
    brojMjesta: "xpath: //input[name='brojMjesta']",
    odgovornaOsoba: "xpath: //input[name='odgovornaOsoba']",
    sprat: "xpath: //input[name='sprat']",
    submitUnosBtn: "xpath: //input[name='unos']",
    load: function () {
      this.open("../unos/unos.html");
      return this.waitForIt();
    },
    submit: function (naziv, brojMjesta, odgovornaOsoba, sprat) {
      this.naziv.typeText(naziv);
      this.brojMjesta.typeText(brojMjesta);
      this.odgovornaOsoba.typeText(odgovornaOsoba);
      this.sprat.typeText(sprat);
      this.submitUnosBtn.click();
    }
  });
  // now you can use it like this
  var unosStranica = new UnosStranica(driver).load();
  unosStranica.submit("Sala", "15", "Meho", 2);

