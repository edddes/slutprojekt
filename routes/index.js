const express = require('express');
const router = express.Router();
const Text = require('../models/text');

// Första sidan (1.ejs)
router.get('/', async (req, res) => {
  const text1 = await Text.findOne({ key: 'text1' });
  res.render('1', { text1: text1 ? text1.content : '' });
});

// Andra sidan (2.ejs)
router.get('/2', async (req, res) => {
  const text2 = await Text.findOne({ key: 'text2' });
  res.render('2', { text2: text2 ? text2.content : '' });
});

// Tredje sidan (3.ejs)
router.get('/3', async (req, res) => {
  const text3 = await Text.findOne({ key: 'text3' });
  res.render('3', { text3: text3 ? text3.content : '' });
});

module.exports = router;
