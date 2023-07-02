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
      'Currencies', // Имя таблицы
      'rate', // Имя столбца
      {
        type: Sequelize.DECIMAL
      }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('Currencies');
     */
    await queryInterface.changeColumn(
      'Currencies', // Имя таблицы
      'rate', // Имя стбца
      {
        type: Sequelize.INTEGER
      }
    );
  }
};
