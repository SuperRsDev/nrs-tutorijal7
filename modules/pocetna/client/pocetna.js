
// Gradovi stranica
function dajElementZaSliku(grad) {
    const div = document.createElement('div');
    div.classList = 'gridElement';
    const img = document.createElement('div');
    img.textContent = grad.name;
    div.appendChild(img);
    return div;
}

function sakrijLoaderPrikaziSadrzaj() {
    const spinner = document.getElementsByClassName('lds-spinner')[0];
    spinner.style.display = 'none';
    document.getElementById('listaSlika').style.display = 'grid';
}

function pokaziLoaderSakrijSadrzaj() {
    const spinner = document.getElementsByClassName('lds-spinner')[0];
    spinner.style.display = 'block';
    document.getElementById('listaSlika').style.display = 'none';
}

function postaviGradove(slike) {
    const slikaParent = document.getElementById('listaGradova');
    if (slike.length <= 0) {
        // Jer je kod pritiska na sljedecu povecana stranica
        Gradovi.postaviSveGradoveVracene();
        return;
    }

    slikaParent.innerHTML = '';
    slike.forEach(slika => {
        slikaParent.appendChild(dajElementZaSliku(slika));
    });
}

function loadGradove() {
    Pozivi.dajStranicuGradova(Gradovi.dajPodatkeZaPoziv(), (slike) => {
        this.postaviGradove(slike);
        Gradovi.dodajSlike(slike);
        Gradovi.dodjeliMaksimalnuDostignutu();
    });
}


function sljedeci() {
    Gradovi.povecajStranicu();
    if (!Gradovi.daLiImaSljedeciFetch()) {
        loadGradove();
    } else {
        this.postaviSlike(Gradovi.dajTrenutneGradove());
    }
}

function prethodni() {
    if (Gradovi.daLiJePocetakSlika()) {
        return;
    }

    Gradovi.smanjiStranicu();
    this.postaviSlike(Gradovi.dajTrenutneGradove());
}


let Gradovi = (function () {
    limit = 3;
    stranica = 0;
    maxDostignutaStranica = 0;
    slikeVracene = false;
    slike = [];

    daLiJePocetakSlika = () => {
        return this.stranica <= 0;
    }

    povecajStranicu = () => {
        this.stranica++;
    }

    dodjeliMaksimalnuDostignutu = () => {
        if (this.maxDostignutaStranica < this.stranica) {
            this.maxDostignutaStranica = this.stranica;
        }
    }

    smanjiStranicu = () => {
        this.stranica--;
        if (this.stranica < 0) {
            this.stranica = 0;
        }
    }

    daLiJeStranicaIspodMaksimalneDohvacene = () => {
        return this.maxDostignutaStranica >= this.stranica;
    }

    dodajSlike = (noveSlike) => {
        if (this.daLiSuSveSlikeVracene()) {
            return;
        }

        this.slike.push(...noveSlike);
    }

    daLiImaSljedeciFetch = () => {
        return this.daLiSuSveSlikeVracene() || this.daLiJeStranicaIspodMaksimalneDohvacene();
    }

    postaviSveGradoveVracene = () => {
        this.slikeVracene = true;
        this.smanjiStranicu();
    }

    daLiSuSveSlikeVracene = () => {
        return this.slikeVracene;
    }

    dajTrenutneGradove = () => {
        let pocetak = stranica * limit;
        const kraj = pocetak + limit;
        const trenutneSlike = slike.slice(pocetak, kraj);
        return trenutneSlike;
    }

    dajPodatkeZaPoziv = () => {
        return { page: stranica, limit: limit};
    }

    return {
        daLiJePocetakSlika,
        dodajSlike,
        povecajStranicu,
        smanjiStranicu,
        dajTrenutneGradove,
        dajPodatkeZaPoziv,
        postaviSveGradoveVracene,
        daLiSuSveSlikeVracene,
        daLiImaSljedeciFetch,
        dodjeliMaksimalnuDostignutu
    }
}());

window.onload = loadGradove;
