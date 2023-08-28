'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;
    await queryInterface.createTable('BalanceReports', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userMombile: {
        type: DataTypes.STRING,
      },
      userName: {
        type: DataTypes.STRING,
      },
      totalSentAmount: {
        type: DataTypes.DECIMAL,
      },
    });
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('BalanceReports');
  }
};
