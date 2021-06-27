'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'noWammy@demo.io',
        username: 'RoyalFoodTaster',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'brienne@ofTarth.com',
        username: 'BrienneTheBeauty',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: 'sansa@stark.com',
        username: 'LittleBird',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: 'arya@stark.com',
        username: 'NoOne',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: 'danaerys@targaryen.com',
        username: 'MotherOfDragons',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: 'tyrion@lannister.com',
        username: 'TheImp',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: 'sandor@clegane.com',
        username: 'TheHound',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: 'jon@snow.com',
        username: 'BastardOfWinterfell',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
