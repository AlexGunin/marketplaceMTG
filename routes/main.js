const express = require('express');

const router = express.Router();
// /main
router.get('/', (req, res) => {
  res.render('main');
});

module.exports = router;
