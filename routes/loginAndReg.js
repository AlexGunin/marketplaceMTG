const express = require('express');

const router = express.Router();
// /user/
router.get('/signin', (req, res, next) => {
  res.render('signin')
});
router.post('/signin', (req, res, next) => {
  res.send('respond with a resource');
});
router.get('/signup', (req, res, next) => {
  res.send('respond with a resource');
});
router.post('/signup', (req, res, next) => {
  res.send('respond with a resource');
});
module.exports = router;
