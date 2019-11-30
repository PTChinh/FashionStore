const Sequelize = require('sequelize');

module.exports = sequelize.define("user", {

    id: {
        type: Sequelize.INTEGER(20),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING(64),
        allowNull: false
    },

    username: {
        type: Sequelize.STRING(32),
        allowNull: false
    },

    password: {
        type: Sequelize.STRING(64),
        allowNull: false
    },

    email: {
        type: Sequelize.STRING(100),
        allowNull: false
    },

    phone: {
        type: Sequelize.INTEGER(10),
        allowNull: false
    },

    address: {
        type: Sequelize.STRING(255),
        allowNull: false
    },

    status: {
        type: Sequelize.INTEGER(1),
        allowNull: false
    }

}, {
    tableName: 'user'
});