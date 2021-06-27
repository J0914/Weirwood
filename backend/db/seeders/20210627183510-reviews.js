'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Reviews', [
    {userId: 2, spotId: 1, body: 'All my life men like you have sneered at me, and all my life I\'ve been knocking men like you into the dust.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 2, spotId: 3, body: 'All my life men like you have sneered at me, and all my life I\'ve been knocking men like you into the dust.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 2, spotId: 5, body: 'All my life men like you have sneered at me, and all my life I\'ve been knocking men like you into the dust.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 2, spotId: 7, body: 'All my life men like you have sneered at me, and all my life I\'ve been knocking men like you into the dust.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 2, spotId: 9, body: 'All my life men like you have sneered at me, and all my life I\'ve been knocking men like you into the dust.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 2, spotId: 11, body: 'All my life men like you have sneered at me, and all my life I\'ve been knocking men like you into the dust.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 2, spotId: 13, body: 'All my life men like you have sneered at me, and all my life I\'ve been knocking men like you into the dust.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 2, spotId: 12, body: 'All my life men like you have sneered at me, and all my life I\'ve been knocking men like you into the dust.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 2, spotId: 8, body: 'All my life men like you have sneered at me, and all my life I\'ve been knocking men like you into the dust.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 3, spotId: 2, body: 'Thank You For All Your Many Lessons, Lord Baelish. I Will Never Forget Them.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 3, spotId: 4, body: 'Thank You For All Your Many Lessons, Lord Baelish. I Will Never Forget Them.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 3, spotId: 6, body: 'Thank You For All Your Many Lessons, Lord Baelish. I Will Never Forget Them.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 3, spotId: 8, body: 'Thank You For All Your Many Lessons, Lord Baelish. I Will Never Forget Them.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 3, spotId: 10, body: 'Thank You For All Your Many Lessons, Lord Baelish. I Will Never Forget Them.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 3, spotId: 12, body: 'Thank You For All Your Many Lessons, Lord Baelish. I Will Never Forget Them.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 3, spotId: 14, body: 'Thank You For All Your Many Lessons, Lord Baelish. I Will Never Forget Them.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 3, spotId: 3, body: 'Thank You For All Your Many Lessons, Lord Baelish. I Will Never Forget Them.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 3, spotId: 7, body: 'Thank You For All Your Many Lessons, Lord Baelish. I Will Never Forget Them.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 4, spotId: 1, body: 'Leave one wolf alive and the sheep are never safe.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 4, spotId: 3, body: 'Leave one wolf alive and the sheep are never safe.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 4, spotId: 14, body: 'Leave one wolf alive and the sheep are never safe.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 4, spotId: 6, body: 'Leave one wolf alive and the sheep are never safe.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 4, spotId: 5, body: 'Leave one wolf alive and the sheep are never safe.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 4, spotId: 7, body: 'Leave one wolf alive and the sheep are never safe.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 4, spotId: 9, body: 'Leave one wolf alive and the sheep are never safe.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 4, spotId: 11, body: 'Leave one wolf alive and the sheep are never safe.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 4, spotId: 13, body: 'Leave one wolf alive and the sheep are never safe.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 5, spotId: 2, body: 'All men must die, but we are not men. ;)', createdAt: new Date(), updatedAt: new Date()},
    {userId: 5, spotId: 4, body: 'All men must die, but we are not men. ;)', createdAt: new Date(), updatedAt: new Date()},
    {userId: 5, spotId: 6, body: 'All men must die, but we are not men. ;)', createdAt: new Date(), updatedAt: new Date()},
    {userId: 5, spotId: 8, body: 'All men must die, but we are not men. ;)', createdAt: new Date(), updatedAt: new Date()},
    {userId: 5, spotId: 10, body: 'All men must die, but we are not men. ;)', createdAt: new Date(), updatedAt: new Date()},
    {userId: 5, spotId: 12, body: 'All men must die, but we are not men. ;)', createdAt: new Date(), updatedAt: new Date()},
    {userId: 5, spotId: 14, body: 'All men must die, but we are not men. ;)', createdAt: new Date(), updatedAt: new Date()},
    {userId: 5, spotId: 1, body: 'All men must die, but we are not men. ;)', createdAt: new Date(), updatedAt: new Date()},
    {userId: 5, spotId: 3, body: 'All men must die, but we are not men. ;)', createdAt: new Date(), updatedAt: new Date()},
    {userId: 5, spotId: 5, body: 'All men must die, but we are not men. ;)', createdAt: new Date(), updatedAt: new Date()},
    {userId: 6, spotId: 1, body: 'It’s not easy being drunk all the time. If it were easy, everyone would do it.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 6, spotId: 3, body: 'It’s not easy being drunk all the time. If it were easy, everyone would do it.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 6, spotId: 5, body: 'It’s not easy being drunk all the time. If it were easy, everyone would do it.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 6, spotId: 7, body: 'It’s not easy being drunk all the time. If it were easy, everyone would do it.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 6, spotId: 9, body: 'It’s not easy being drunk all the time. If it were easy, everyone would do it.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 6, spotId: 11, body: 'It’s not easy being drunk all the time. If it were easy, everyone would do it.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 6, spotId: 12, body: 'It’s not easy being drunk all the time. If it were easy, everyone would do it.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 6, spotId: 14, body: 'It’s not easy being drunk all the time. If it were easy, everyone would do it.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 6, spotId: 13, body: 'It’s not easy being drunk all the time. If it were easy, everyone would do it.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 6, spotId: 6, body: 'It’s not easy being drunk all the time. If it were easy, everyone would do it.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 6, spotId: 8, body: 'It’s not easy being drunk all the time. If it were easy, everyone would do it.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 7, spotId: 2, body: 'I understand that if any more words come pouring out of your mouth, I\'m gonna have to eat every f****** chicken in this room.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 7, spotId: 4, body: 'I understand that if any more words come pouring out of your mouth, I\'m gonna have to eat every f****** chicken in this room.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 7, spotId: 6, body: 'I understand that if any more words come pouring out of your mouth, I\'m gonna have to eat every f****** chicken in this room.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 7, spotId: 8, body: 'I understand that if any more words come pouring out of your mouth, I\'m gonna have to eat every f****** chicken in this room.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 7, spotId: 10, body: 'I understand that if any more words come pouring out of your mouth, I\'m gonna have to eat every f****** chicken in this room.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 7, spotId: 12, body: 'I understand that if any more words come pouring out of your mouth, I\'m gonna have to eat every f****** chicken in this room.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 7, spotId: 14, body: 'I understand that if any more words come pouring out of your mouth, I\'m gonna have to eat every f****** chicken in this room.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 7, spotId: 7, body: 'I understand that if any more words come pouring out of your mouth, I\'m gonna have to eat every f****** chicken in this room.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 7, spotId: 9, body: 'I understand that if any more words come pouring out of your mouth, I\'m gonna have to eat every f****** chicken in this room.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 7, spotId: 11, body: 'I understand that if any more words come pouring out of your mouth, I\'m gonna have to eat every f****** chicken in this room.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 8, spotId: 1, body: 'What did Father use to say? ‘Everything before the word ‘but’ is horse-s***.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 8, spotId: 3, body: 'What did Father use to say? ‘Everything before the word ‘but’ is horse-s***.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 8, spotId: 5, body: 'What did Father use to say? ‘Everything before the word ‘but’ is horse-s***.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 8, spotId: 7, body: 'What did Father use to say? ‘Everything before the word ‘but’ is horse-s***.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 8, spotId: 9, body: 'What did Father use to say? ‘Everything before the word ‘but’ is horse-s***.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 8, spotId: 13, body: 'What did Father use to say? ‘Everything before the word ‘but’ is horse-s***.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 8, spotId: 2, body: 'What did Father use to say? ‘Everything before the word ‘but’ is horse-s***.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 8, spotId: 4, body: 'What did Father use to say? ‘Everything before the word ‘but’ is horse-s***.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 8, spotId: 6, body: 'What did Father use to say? ‘Everything before the word ‘but’ is horse-s***.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 8, spotId: 8, body: 'What did Father use to say? ‘Everything before the word ‘but’ is horse-s***.', createdAt: new Date(), updatedAt: new Date()},
    {userId: 8, spotId: 10, body: 'What did Father use to say? ‘Everything before the word ‘but’ is horse-s***.', createdAt: new Date(), updatedAt: new Date()},
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Reviews', null, {});
  }
};
