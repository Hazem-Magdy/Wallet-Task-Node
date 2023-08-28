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
        validate: {
          is: /^[a-zA-Z]+$/
        }
      },
      mobile: { 
        type: DataTypes.STRING,
        validate: {
          is: /^(\+20|0)?1\d{9}$/
        }
      },
      balance: { 
        type: DataTypes.DECIMAL,
        validate: {
          min: 0
        }
      },
      password: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('Admin', 'User'),
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
