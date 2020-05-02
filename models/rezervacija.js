const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){
    const Rezervacija = sequelize.define('rezervacija', {
        termin: {
            type: Sequelize.INTEGER,
            model: 'termin', // <<< Note, its table's name, not object name
            foreignKey: 'id', // <<< Note, its a column name
            unique: 'fkTerminURezervaciji'
        },
        sala: {
            type: Sequelize.INTEGER,
            model: 'sala',
            foreignKey: 'id'
        },
        osoba: {
            type: Sequelize.INTEGER,
            model: 'osoblje',
            foreignKey: 'id'
        }
     }, { freezeTableName: true });

    return Rezervacija;
};