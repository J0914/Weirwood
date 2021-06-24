'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    userId: {
      allowNull: false,
      required: true,
      type: DataTypes.INTEGER
    },
    spotId: {
      allowNull: false,
      required: true,
      type: DataTypes.INTEGER
    },
    start: {
      allowNull: false,
      required: true,
      type: DataTypes.DATEONLY
    },
    end: {
      allowNull: false,
      required: true,
      type: DataTypes.DATEONLY
    },
  }, {});
  Booking.associate = function(models) {
    Booking.belongsTo(models.User, { foreignKey: 'userId' });
    Booking.belongsTo(models.Spot, { foreignKey: 'spotId' });
  };
  return Booking;
};