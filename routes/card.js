const express = require('express');
const { Card, User } = require('../db/models');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const card = await Card.findOne({ where: { id } });
  const user = await User.findOne({ where: { id: user_id } });
  res.render('post');
});

module.exports = router;
