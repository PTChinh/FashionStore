const Sequelize = require('sequelize');

module.exports = sequelize.define("orders", {

    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    transactionID: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },

    productID: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },

    totalProduct: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },

    productName: {
        type: Sequelize.STRING(200),
        allowNull: false
    },

    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },

    amount: {
        type: Sequelize.DECIMAL(15,4),
        allowNull:false
    }

}, {
    tableName: 'orders'
});