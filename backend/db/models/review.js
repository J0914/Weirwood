'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
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
    body: {
      type: DataTypes.TEXT(200)
    },
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.Spot, { foreignKey: 'spotId' })
    Review.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Review;
};