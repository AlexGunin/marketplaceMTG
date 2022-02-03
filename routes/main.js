const express = require('express');
const { Card, User, City } = require('../db/models');

const router = express.Router();
// /main
router.get('/', async (req, res) => {
  const allCards = await Card.findAll({ include: [User, City] });
  const allCardsWithCorrectDate = allCards.map((card) => {
    const options = {
      month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',
    };
    const date = card.createdAt.toLocaleDateString('ru', options);
    return { ...card, createdAt: date };
  });
  console.log(allCardsWithCorrectDate);
  res.render('main', { allCards: allCardsWithCorrectDate });
});

module.exports = router;
