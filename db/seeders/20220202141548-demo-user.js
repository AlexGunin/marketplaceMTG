'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'Alexandr',
      email: 'alexandr@mail.ru',
      password: '123',
      city_id: 2,
      photo: 'https://cdnn21.img.ria.ru/images/07e4/0b/1b/1586584321_0:0:3078:1732_1920x0_80_0_0_4f8911ad8a2bb72bd1a568150a5c7db6.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Leonid',
      email: 'leo@mail.ru',
      password: '123',
      city_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
