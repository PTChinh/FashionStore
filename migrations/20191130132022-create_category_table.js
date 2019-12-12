'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("category", {

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
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }

    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("category");
  }
};
