const express = require('express');
const router = express.Router();
const { User, City, Card } = require('../db/models');


router.get('/', (req, res) => {
  const user = User.findOne();
  res.render('profile', { user });
})

module.exports = router;
