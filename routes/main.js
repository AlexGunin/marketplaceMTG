const express = require('express');
const { Op } = require('sequelize');
const { Card, User, City } = require('../db/models');

const router = express.Router();
// /main
router.get('/', async (req, res) => {
  const allCards = await Card.findAll({ include: [User, City] });
  res.render('main', allCards);
});
router.post('/', async (req, res) => {
  const { query = '' } = req.body;
  const allCards = await Card.findAll({
    include: [User, City],
    where: {
      title: { [Op.like]: `%${query}%` },
    },
  });

  res.json({ allCards });
});
router.get('/bucket', (req, res) => {
  res.render('bucket');
});
module.exports = router;
