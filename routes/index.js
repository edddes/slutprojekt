const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const Text = require('../models/text');
const Image = require('../models/Image');

function filterImagesWithFile(images) {
  return images.filter(img =>
    fs.existsSync(path.join(__dirname, '../public/uploads', img.filename))
  );
}

router.get('/', async (req, res) => {
  const text1 = await Text.findOne({ key: 'text1' }) || { content: 'Välkommen till startsidan!' };
  const images = await Image.find().sort({ uploadedAt: -1 });
  const imagesWithFile = filterImagesWithFile(images);
  res.render('1', { text1: text1.content, images: imagesWithFile });
});

router.get('/2', async (req, res) => {
  const text2 = await Text.findOne({ key: 'text2' }) || { content: 'Detta är sida 2.' };
  const images = await Image.find().sort({ uploadedAt: -1 });
  const imagesWithFile = filterImagesWithFile(images);
  res.render('2', { text2: text2.content, images: imagesWithFile });
});

router.get('/3', async (req, res) => {
  const text3 = await Text.findOne({ key: 'text3' }) || { content: 'Detta är sida 3.' };
  const images = await Image.find().sort({ uploadedAt: -1 });
  const imagesWithFile = filterImagesWithFile(images);
  res.render('3', { text3: text3.content, images: imagesWithFile });
});

router.get('/index', (req, res) => {
  res.redirect('/');
});

module.exports = router;
