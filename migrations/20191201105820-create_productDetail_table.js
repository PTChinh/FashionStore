'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("productDetail", {

      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      product_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },

      image: {
        type: Sequelize.STRING(200),
        allowNull: false
      },

      color: {
        type: Sequelize.STRING(100),
        allowNull: true
      },

      size: {
        type: Sequelize.STRING(4),
        allowNull: true
      },

      total: {
        type: Sequelize.INTEGER(255),
        allowNull: false
      },

      buyed: {
        type: Sequelize.INTEGER(255),
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
    return queryInterface.dropTable("productDetail");
  }
};
