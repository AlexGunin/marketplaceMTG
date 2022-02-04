const express = require('express');
const sha256 = require('sha256');
const { User, City } = require('../db/models');

const router = express.Router();
// /user/
router.get('/signin', (req, res) => {
  res.render('signin');
});
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    if (user.password === sha256(password)) {
      req.session.username = user.name;
      req.session.userId = user.id;

      res.json({ message: 'OK' });
    } else {
      res.json({ error: 'неверный пароль' });
    }
  } else {
    res.json({ error: 'пользователь с таким email не найден' });
  }
});
router.get('/signup', (req, res) => {
  res.render('signup');
});
router.post('/signup', async (req, res) => {
  const {
    name, email, password, city,
  } = req.body;
  const findCity = await City.findOne({ where: { title: city } });
  const city_id = findCity?.id ?? (await City.create({ title: city })).id;
  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.json({ error: 'Такой пользователь уже существует' });
  }
  await User.create({
    name: name.trim().split(' ')[0], email, password: sha256(password), city_id,
  });
  res.json({ message: 'ok' });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('name');
  res.redirect('/user/signin');
});

router.get('/profile/:id', async (req, res) => {
  const user = await User.findOne({ include: [City] });
  res.render('profile', { user });
});
module.exports = router;
