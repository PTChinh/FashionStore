const Sequelize = require('sequelize');

const sequelize = new Sequelize('fashionstore', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
global.sequelize = sequelize;