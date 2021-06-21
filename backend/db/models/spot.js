'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING(80)
    },
    location: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
  }, {});
  Spot.associate = function(models) {
    Spot.hasMany(models.Image, { foreignKey: 'spotId' })
  };
  return Spot;
};