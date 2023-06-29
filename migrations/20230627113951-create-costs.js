'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Costs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        }
      },
      currency: {
        type: Sequelize.INTEGER
      },
      cost: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Costs');
  }
};