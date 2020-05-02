const cities = require('cities.json');

const dajGradove = function(page, limit) {
    let pocetak = page * limit;
    const kraj = pocetak + limit;
    const gradovi = cities.slice(pocetak, kraj);
    return gradovi;
}

exports.dajPaginacijuGradova = function(req) {
    let page = req.query.page;
    let limit = req.query.limit;
    if (typeof page !== 'number') {
        page = parseInt(page);
    }

    if (typeof limit !== 'number') {
        limit = parseInt(limit);
    }
    const gradovi = dajGradove(page, limit);
    return gradovi;
}
