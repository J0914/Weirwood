'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    regionId: {
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
    price: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {});
  Spot.associate = function(models) {
    Spot.hasMany(models.Image, { foreignKey: 'spotId' })
    Spot.belongsTo(models.Region, { foreignKey: 'regionId'})
    Spot.hasMany(models.Booking, { foreignKey: 'spotId'})
    // Spot.hasMany(models.Review, { foreignKey: 'spotId'})

  };
  return Spot;
};