const Sequelize = require('sequelize'),
    moment = require('moment');
const formatVremenaUBazi = "HH:mm:ss";
const zeljeniFormat = "HH:mm";
module.exports = function(sequelize,DataTypes){
    const Termin = sequelize.define('termin', {
        redovni: Sequelize.BOOLEAN,
        dan: Sequelize.INTEGER,
        datum: Sequelize.STRING,
        semestar: Sequelize.STRING,
        pocetak: {
            type: Sequelize.TIME,
            get() {
                const rawValue = this.getDataValue('pocetak');
                return moment(rawValue, formatVremenaUBazi).format(zeljeniFormat);;
            }
        },
        kraj: {
            type: Sequelize.TIME,
            get() {
                const rawValue = this.getDataValue('kraj');
                return moment(rawValue, formatVremenaUBazi).format(zeljeniFormat);;
            }
        }
     }, { freezeTableName: true });

    return Termin;
};