'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn(
      'Users', 
      'token');

    await queryInterface.addColumn(
      'Users', 
      'token',
      {
        type: Sequelize.STRING(1000),
        allowNull: false,
        defaultValue: ""
      });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn(
      'Users', 
      'token');
  }
};
