const Sequelize = require('sequelize');

module.exports = sequelize.define("orders", {

    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    transaction_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },

    product_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },

    total_product: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },

    product_name: {
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