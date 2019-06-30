const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('../views/home/index', { msgSuccess: req.query.msgSuccess });
});

module.exports = router;
