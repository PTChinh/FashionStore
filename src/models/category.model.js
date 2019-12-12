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
        allowNull: false
    },

    orders: {
        type: Sequelize.INTEGER(4),
        allowNull: true
    },

    status: {
        type: Sequelize.INTEGER(1),
        allowNull: false
    }

}, {
    tableName: 'category'
});