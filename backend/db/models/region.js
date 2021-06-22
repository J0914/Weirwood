'use strict';
module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define('Region', {
    title: {
      allowNull: false,
      type: DataTypes.TEXT
    },
  }, {});
  Region.associate = function(models) {
    Region.hasMany(models.Spot, { foreignKey: 'regionId'})
  };
  return Region;
};