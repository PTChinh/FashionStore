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
        type: Sequelize.STRING(200),
        allowNull: false
    },

    view: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    }

}, {
    tableName: 'product'
});