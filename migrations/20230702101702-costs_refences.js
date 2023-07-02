'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn(
      'Costs', // Имя таблицы
      'currency', // Имя столбца
      {
        type: Sequelize.INTEGER,
        references:{
          model: 'Currencies',
          key: 'id'
        }
      }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('Costs');
     */
    await queryInterface.changeColumn(
      'Costs', // Имя таблицы
      'currency', // Имя стбца
      {
        type: Sequelize.INTEGER,
      }
    );
  }
};
