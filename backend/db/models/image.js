'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    spotId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    url: {
      allowNull: false,
      type: Sequelize.STRING
    },
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
  };
  return Image;
};