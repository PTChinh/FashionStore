'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("supplier", {

      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      name: {
        type: Sequelize.STRING(200),
        allowNull: false
      },

      address: {
        type: Sequelize.STRING(255),
        allowNull: false
      },

      email: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      phone: {
        type: Sequelize.INTEGER(10),
        allowNull: false
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }

    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("supplier");
  }
};
