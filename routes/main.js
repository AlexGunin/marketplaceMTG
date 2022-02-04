const express = require('express');
const { Op } = require('sequelize');
const { Card, User, City } = require('../db/models');
const { commonAccess, certainIdAccess } = require('../middleware/accessMiddleware');

const router = express.Router();
// /main
router.get('/', async (req, res) => {
  const allCards = await Card.findAll({ include: [User, City] });
  res.render('main', allCards);
});
router.post('/', async (req, res) => {
  const { title = '', city } = req.body;
  const allCards = await Card.findAll({
    include: [User, City],
    where: {
      [Op.and]: [
        { title: { [Op.like]: `%${title}%` } },

      ],
    },
  });

  if (city) {
    return res.json({ allCards: allCards.filter((card) => card.City.title === city) });
  }

  return res.json({ allCards });
});
router.get('/bucket/:userId', commonAccess, certainIdAccess, (req, res) => {
  res.render('bucket');
});
router.get('/city', async (req, res) => {
  const allCity = await City.findAll();
  res.json(allCity);
});
module.exports = router;
