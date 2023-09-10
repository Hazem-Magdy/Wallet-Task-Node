'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;
    await queryInterface.createTable('UserRoles', {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('UserRoles');
  }
};
