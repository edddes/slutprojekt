const express = require('express');
const router = express.Router();
const Text = require('../models/text');

// Redigera text till 1.ejs
router.get('/edit/text1', async (req, res) => {
  const text = await Text.findOne({ key: 'text1' });
  res.render('admin_edit', { key: 'text1', content: text ? text.content : '' });
});
router.post('/edit/text1', async (req, res) => {
  await Text.findOneAndUpdate(
    { key: 'text1' },
    { content: req.body.content },
    { upsert: true }
  );
  res.redirect('/admin/edit/text1');
});

// Redigera text till 2.ejs
router.get('/edit/text2', async (req, res) => {
  const text = await Text.findOne({ key: 'text2' });
  res.render('admin_edit', { key: 'text2', content: text ? text.content : '' });
});
router.post('/edit/text2', async (req, res) => {
  await Text.findOneAndUpdate(
    { key: 'text2' },
    { content: req.body.content },
    { upsert: true }
  );
  res.redirect('/admin/edit/text2');
});

// Redigera text till 3.ejs
router.get('/edit/text3', async (req, res) => {
  const text = await Text.findOne({ key: 'text3' });
  res.render('admin_edit', { key: 'text3', content: text ? text.content : '' });
});
router.post('/edit/text3', async (req, res) => {
  await Text.findOneAndUpdate(
    { key: 'text3' },
    { content: req.body.content },
    { upsert: true }
  );
  res.redirect('/admin/edit/text3');
});

module.exports = router;
