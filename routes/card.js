/* eslint-disable camelcase */
const express = require('express');
const multer = require('multer');
const { Card, User, City } = require('../db/models');

const upload = multer({ dest: 'public/uploads/' });
const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const card = await Card.findOne({ where: { id }, include: [User, City], raw: true });
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
  const { userId } = req.session;
  const userCard = await Card.findAll({ where: { user_id: userId } });
  // console.log(userCard);
  res.render('usercard', { userCard });
});

router.get('/', async (req, res) => {
  res.render('newCard');
});

router.post('/', upload.single('image'), async (req, res) => {
  const user_id = req.session.userId;
  const {
    city, title, body, price, state, quantity,
  } = req.body;
  const image = req.file.path.split('/').slice(1).join('/');
  console.log('=========================================>', image);
  const cityOne = await City.findOne({ where: { title: city } });
  const city_id = cityOne ? cityOne.id : (await City.create({ title: city })).id;
  const newCard = await Card.create({
    user_id, title, body, image, city_id, price, quantity, state, available: true, views: 0,
  });
  const cardId = newCard.id;
  // console.log(cardId);
  res.redirect(`/card/${cardId}`);
});

router.get('/bucket', (req, res) => {
  res.render('bucket');
});
module.exports = router;
