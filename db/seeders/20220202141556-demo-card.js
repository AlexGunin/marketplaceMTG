module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Cards', [{
      user_id: 1,
      title: 'Butcher card',
      body: 'Продам карточку Пуджа из Доты! Кто любит таких героев, го покупать',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6DjhPmcedkoFjbhEzEYA_0VPj9uGJdmqbnA&usqp=CAU',
      city_id: 2,
      price: '450',
      views: 1,
      state: 'в идеальном состоянии',
      available: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      user_id: 2,
      title: 'Lucifer card',
      body: 'Продам карточку Dooma из Доты! Кто любит таких героев, го покупать',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtKnw_POL1noZ_GNjzXMskvPryBOb20rby2w&usqp=CAU',
      city_id: 1,
      price: '250',
      views: 1,
      state: 'в хорошем состоянии',
      available: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      user_id: 1,
      title: 'Nevermore card',
      body: 'Продам карточку sfa из Доты! Кто любит таких героев, го покупать',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUV3_2dEwtiZaWFwTIMM1a3FV2NN-rIhfMkA&usqp=CAU',
      city_id: 2,
      price: '1000',
      views: 1,
      state: 'в довольно потрепанном состоянии',
      available: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Cards', null, {});
  },
};
