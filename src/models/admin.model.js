const Sequelize = require('sequelize');

module.exports = sequelize.define("admin", {

    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    role: {
        type: Sequelize.INTEGER(5),
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

    status: {
        type: Sequelize.INTEGER(1),
        allowNull: false
    },

    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
    },

    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
    }

}, {
    tableName: 'admin'
});