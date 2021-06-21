'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Spots', [
    {userId: 2, title:'Dragonstone', location: 'Blackwater Bay, Westeros', description: "Dragonstone is a volcanic island in the Narrow Sea that guards the entrance to Blackwater Bay and the sea approaches to King's Landing, off the east coast of Westeros. It is the location of the eponymous castle of Dragonstone, the ancestral seat of House Targaryen, the former seat of King Stannis Baratheon, one of the claimants to the Iron Throne, and Queen Daenerys Targaryen.", createdAt: new Date(), updatedAt: new Date() },
    {userId: 2, title:'The Eyrie', location: 'The Vale, Westeros', description: "The Eyrie is the principal stronghold of House Arryn. It is located in the Vale of Arryn near the east coast of Westeros. The Eyrie straddles the top of a peak in the Mountains of the Moon several thousand feet above the valley floor below. It is approached by a narrow causeway and road. Those who would approach the Eyrie must pass through three way-castles guarding the ascent - and then, must proceed in single file, making them very vulnerable to archers. For these reasons, the Eyrie is considered impregnable to any attack that does not involve dragons, and its defenses have never been overcome. It is currently the seat of Robin Arryn – the Warden of the East.", createdAt: new Date(), updatedAt: new Date() }
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
