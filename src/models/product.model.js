const Sequelize = require('sequelize');

module.exports = sequelize.define("product", {

    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    supplierID: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },

    categoryID: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },

    name: {
        type: Sequelize.STRING(200),
        allowNull: false
    },

    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },

    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },

    sale: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },

    image: {
        type: Sequelize.STRING(64),
        allowNull: false
    },

    view: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },

    warranty: {
        type: Sequelize.STRING(64),
        allowNull: false
    },

    total: {
        type: Sequelize.INTEGER(255),
        allowNull: false
    },

    buyed: {
        type: Sequelize.INTEGER(255),
        allowNull: false
    },

    specifications: {
        type: Sequelize.TEXT,
        allowNull: false
    }

}, {
    tableName: 'product'
});