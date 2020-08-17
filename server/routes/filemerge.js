const express = require('express');
const router = express.Router();

const { APIError } = require('../error/BaseError');

/* GET users listing. */
router.get('/', async (req, res, next) => {

  res.send('respond with a resource');
});

module.exports = router;
