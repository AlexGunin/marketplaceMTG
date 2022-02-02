const express = require('express');
const { Card, User } = require('../db/models');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const card = await Card.findOne({ where: { id }, include: [{ model: 'Users' }] });
  console.log('==========================================================>',card);
  res.render('post', { card });
});

module.exports = router;
