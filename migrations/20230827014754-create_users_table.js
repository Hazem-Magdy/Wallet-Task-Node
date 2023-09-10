'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;
    await queryInterface.createTable('Users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { 
        type: DataTypes.STRING,
      },
      mobile: { 
        type: DataTypes.STRING,
      },
      balance: { 
        type: DataTypes.DECIMAL,
      },
      password: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
