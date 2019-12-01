const Sequelize = require('sequelize');

module.exports = sequelize.define("productDetail", {

    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    productID: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },

    image: {
        type: Sequelize.STRING(200),
        allowNull: false
    },

    color: {
        type: Sequelize.STRING(100),
        allowNull: false
    },

    size: {
        type: Sequelize.STRING(4),
        allowNull: false
    },

    total: {
        type: Sequelize.INTEGER(255),
        allowNull: false
    },

    buyed: {
        type: Sequelize.INTEGER(255),
        allowNull: false
    }

}, {
    tableName: 'productDetail'
});