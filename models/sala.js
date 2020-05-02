const Sequelize = require('sequelize');

module.exports = function(sequelize,DataTypes){
    const Sala = sequelize.define('sala', {
        naziv: Sequelize.STRING,
        zaduzenaOsoba: {
            type: Sequelize.INTEGER,
            model: 'osoblje', 
            foreignKey: 'id'
        }
     }, { freezeTableName: true });

    return Sala;
};