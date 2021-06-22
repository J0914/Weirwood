'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Images', [
    {spotId: 1, url: '/images/Dragonstone1.jpg', createdAt: new Date(), updatedAt: new Date()},
    {spotId: 2, url: '/images/TheEyrie1.png', createdAt: new Date(), updatedAt: new Date()},
    {spotId: 3, url: '/images/Casterly-rock1.png', createdAt: new Date(), updatedAt: new Date()},
    {spotId: 4, url: '/images/kingsLanding1.jpg', createdAt: new Date(), updatedAt: new Date()},
    {spotId: 5, url: '/images/Castle_Black1.jpg', createdAt: new Date(), updatedAt: new Date()},
    {spotId: 6, url: '/images/citadel.jpg', createdAt: new Date(), updatedAt: new Date()},
    {spotId: 7, url: '/images/Pyke.jpg', createdAt: new Date(), updatedAt: new Date()},
    {spotId: 8, url: '/images/Harrenhal.jpg', createdAt: new Date(), updatedAt: new Date()},
    {spotId: 9, url: '/images/TheDreadfort.jpg', createdAt: new Date(), updatedAt: new Date()},
    {spotId: 10, url: '/images/theTwins.jpg', createdAt: new Date(), updatedAt: new Date()},
    {spotId: 11, url: '/images/winterfell.jpg', createdAt: new Date(), updatedAt: new Date()},
    {spotId: 12, url: '/images/hornhill.jpg', createdAt: new Date(), updatedAt: new Date()},
    {spotId: 13, url: '/images/riverrun.png', createdAt: new Date(), updatedAt: new Date()},
    {spotId: 14, url: '/images/highgarden.jpg', createdAt: new Date(), updatedAt: new Date()},

   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
