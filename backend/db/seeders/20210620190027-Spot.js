'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Spots', [
    {userId: 2, title:'Dragonstone', location: 'Blackwater Bay, Westeros', description: "Dragonstone is a volcanic island in the Narrow Sea that guards the entrance to Blackwater Bay and the sea approaches to King's Landing, off the east coast of Westeros. It is the location of the eponymous castle of Dragonstone, the ancestral seat of House Targaryen, the former seat of King Stannis Baratheon, one of the claimants to the Iron Throne, and Queen Daenerys Targaryen.", createdAt: new Date(), updatedAt: new Date() }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Spots', null, {});
  }
};
