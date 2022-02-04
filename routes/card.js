/* eslint-disable camelcase */
const express = require('express');
const { Card, User, City } = require('../db/models');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const card = await Card.findOne({ where: { id }, include: [User, City],  raw: true });
  const user = card['User.name'];
  const city = card['City.title'];
  const options = {
    month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',
  };
  const date = card.createdAt.toLocaleDateString('ru', options);
  // console.log('==========================================================>',card);
  res.render('card', {
    card, user, city, date,
  });
});

router.get('/posts/:id', async (req, res) => {

});

router.get('/', async (req, res) => {
  res.render('newCard');
});

router.post('/', async (req, res) => {
  // const user_id = req.session.userId;
  // const {
  //   city, title, body, image, price, state,
  // } = req.body;
  // console.log('==========================================================>', req.body);

  // const cityOne = await City.findOne({ where: { title: city } });
  // const city_id = cityOne ? cityOne.id : (await City.create({ title: city })).id;
  // const newCard = await Card.create({
  //   user_id, title, body, image, city_id, price, state, available: true, views: 0,
  // });
  // console.log('==========================================================>', image);
  // const cardId = newCard.id;
  // res.redirect(`/card/${cardId}`);
  console.log(req.body);
});

router.get('/bucket', (req, res) => {
  res.render('bucket');
});
module.exports = router;
