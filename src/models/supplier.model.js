const Sequelize = require('sequelize');

module.exports = sequelize.define("supplier", {

    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING(200),
        allowNull: false
    },

    address: {
        type: Sequelize.STRING(255),
        allowNull: false
    },

    email: {
        type: Sequelize.STRING(100),
        allowNull: false
    },

    phone: {
        type: Sequelize.INTEGER(10),
        allowNull: false
    }

}, {
    tableName: 'supplier'
});