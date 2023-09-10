'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;
    await queryInterface.createTable('Transactions', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      senderMobile: { 
        type: DataTypes.STRING,
      },
      receiverMobile: { 
        type: DataTypes.STRING,
      },
      balance: { 
        type: DataTypes.DECIMAL,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};
