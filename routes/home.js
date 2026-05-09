const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');

router.get('/', auth, (req, res) => {
  res.render('index', {
    user: req.session.user
  });
});

module.exports = router;