const Sequelize = require('sequelize');

module.exports = sequelize.define("productDetail", {

    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    product_id: {
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
    tableName: 'productDetail'
});