const Sequelize = require('sequelize');

module.exports = sequelize.define("category", {

    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING(128),
        allowNull: false
    },

    parent_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    },

    orders: {
        type: Sequelize.INTEGER(4),
        allowNull: true
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
    tableName: 'category'
});