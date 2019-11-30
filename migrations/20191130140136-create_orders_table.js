'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("orders", {

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
        type: Sequelize.INTEGER(11),
        allowNull: false
      },

      amount: {
        type: Sequelize.DECIMAL(15,4),
        allowNull:false
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
    return queryInterface.dropTable("orders");
  }
};
