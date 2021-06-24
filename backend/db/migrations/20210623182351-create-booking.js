'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        required: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        allowNull: false,
        required: true,
        type: Sequelize.INTEGER
      },
      start: {
        allowNull: false,
        required: true,
        type: Sequelize.DATEONLY
      },
      end: {
        allowNull: false,
        required: true,
        type: Sequelize.DATEONLY
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Bookings');
  }
};