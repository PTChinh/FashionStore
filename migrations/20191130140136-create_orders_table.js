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
        type: Sequelize.INTEGER(11),
        allowNull: false
      },

      amount: {
        type: Sequelize.DECIMAL(15,4),
        allowNull:false
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
    return queryInterface.dropTable("orders");
  }
};
