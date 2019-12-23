const Sequelize = require('sequelize');

module.exports = sequelize.define("transaction", {

    id: {
        type: Sequelize.INTEGER(20),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    status: {
        type: Sequelize.INTEGER(1),
        allowNull: false
    },

    user_id: {
      type: Sequelize.INTEGER(20),
      allowNull: false
    },

    name: {
        type: Sequelize.STRING(64),
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
        type: Sequelize.STRING(10),
        allowNull: false
    },

    amount: {
        type: Sequelize.DECIMAL(15,4),
        allowNull: false
    },

    payment: {
        type: Sequelize.STRING(32),
        allowNull: false
    },

    message: {
        type: Sequelize.STRING(255),
        allowNull: true
    },

    transport: {
        type: Sequelize.STRING(100),
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
    tableName: 'transaction'
});