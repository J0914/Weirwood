'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING(80)
    },
    location: {
      allowNull: false,
      type: Sequelize.STRING(100)
    },
    description: {
      allowNull: false,
      type: Sequelize.TEXT
    },
  }, {});
  Spot.associate = function(models) {
    // associations can be defined here
  };
  return Spot;
};