const express = require('express');
const { Card, User, City } = require('../db/models');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const card = await Card.findOne({ where: { id }, include: [{ model: 'Users' }] });
  console.log('==========================================================>',card);
  res.render('post', { card });
});

router.get('/posts/:id', async (req, res) => {

});

module.exports = router;
