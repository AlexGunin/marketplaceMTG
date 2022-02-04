/* eslint-disable camelcase */
const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'public/uploads/' });
const { Card, User, City } = require('../db/models');

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

  res.render('card', {
    card, user, city, date,
  });
});

router.get('/', (req, res) => {
  res.render('newCard');
});

router.post('/', upload.single('image'), async (req, res) => {
  const user_id = req.session.userId;
  const {
    city, title, body, price, state, quantity,
  } = req.body;
  const image = req.file.path.split('/').slice(1).join('/');
  const cityOne = await City.findOne({ where: { title: city } });
  const city_id = cityOne ? cityOne.id : (await City.create({ title: city })).id;
  const newCard = await Card.create({
    user_id, title, body, image, city_id, price, quantity, state, available: true, views: 0,
  });
  const cardId = newCard.id;
  res.redirect(`/card/${cardId}`);
});

module.exports = router;
