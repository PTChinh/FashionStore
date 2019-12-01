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

      supplierID: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },

      categoryID: {
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

      view: {
        type: Sequelize.INTEGER(11),
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
    return queryInterface.dropTable("product");
  }
};
