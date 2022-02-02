const express = require('express');
const sha256 = require('sha256')
const {User, City} = require('../db/models')

const router = express.Router();
// /user/
router.get('/signin', (req, res) => {
  res.render('signin')
});
router.post('/signin', async (req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({where: {email}})
  if (user) {
    if (user.password === sha256(password)) {
      res.json({message: 'OK'})
    } else {
      res.json({error: 'неверный пароль'})
    }
  } else {
    res.json({error: 'пользователь с таким email не найден'})
  }
});
router.get('/signup', (req, res) => {
  res.render('signup')
});
router.post('/signup', async (req, res) => {
  const {name, email, password, city} = req.body
  const findCity = await City.findOne({where: {title: city}})
  const cityId = findCity?.id ?? (await City.create({title: city})).id
  const user = await User.findOne({where:})
  res.json({message: 'ok'})
});
module.exports = router;
