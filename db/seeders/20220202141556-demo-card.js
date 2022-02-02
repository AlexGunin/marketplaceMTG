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
      image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.behance.net%2Fgallery%2F13692937%2FPudge&psig=AOvVaw08ao-Ai5EE1_qmwrftQ7lC&ust=1643898340473000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPjJnNmc4fUCFQAAAAAdAAAAABAD',
      city_id: 2,
      price: '450',
      views: 1,
      state: 'в идеальном состоянии',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      user_id: 2,
      title: 'Lucifer card',
      body: 'Продам карточку Dooma из Доты! Кто любит таких героев, го покупать',
      image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.behance.net%2Fgallery%2F13692937%2FPudge&psig=AOvVaw08ao-Ai5EE1_qmwrftQ7lC&ust=1643898340473000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPjJnNmc4fUCFQAAAAAdAAAAABAD',
      city_id: 1,
      price: '250',
      views: 1,
      state: 'в хорошем состоянии',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      user_id: 1,
      title: 'Nevermore card',
      body: 'Продам карточку sfa из Доты! Кто любит таких героев, го покупать',
      image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.behance.net%2Fgallery%2F13692937%2FPudge&psig=AOvVaw08ao-Ai5EE1_qmwrftQ7lC&ust=1643898340473000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPjJnNmc4fUCFQAAAAAdAAAAABAD',
      city_id: 2,
      price: '1000',
      views: 1,
      state: 'в довольно потрепанном состоянии',
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
