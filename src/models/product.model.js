const Sequelize = require('sequelize');

module.exports = sequelize.define("product", {

    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    supplier_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },

    category_id: {
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

    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
    },

    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
    }

}, {
    tableName: 'product'
});