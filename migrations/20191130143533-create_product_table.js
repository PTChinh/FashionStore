'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("product", {

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
    return queryInterface.dropTable("product");
  }
};
