'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("transaction", {

      id: {
        type: Sequelize.INTEGER(20),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      status: {
        type: Sequelize.INTEGER(1),
        allowNull: false
      },

      user_id: {
        type: Sequelize.INTEGER(20),
        allowNull: false
      },

      name: {
        type: Sequelize.STRING(64),
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

      amount: {
        type: Sequelize.DECIMAL(15,4),
        allowNull: false
      },

      payment: {
        type: Sequelize.STRING(32),
        allowNull: false
      },

      message: {
        type: Sequelize.STRING(255),
        allowNull: true
      },

      transport: {
        type: Sequelize.STRING(100),
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
    return queryInterface.dropTable("transaction");
  }
};
