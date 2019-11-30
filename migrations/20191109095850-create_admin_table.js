'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.createTable("admin", {

      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      role: {
        type: Sequelize.INTEGER(5),
        allowNull: false
      },

      username: {
        type: Sequelize.STRING(32),
        allowNull: false
      },

      password: {
        type: Sequelize.STRING(64),
        allowNull: false
      },

      email: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      status: {
        type: Sequelize.INTEGER(1),
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
    return queryInterface.dropTable("admin");
  }
};
