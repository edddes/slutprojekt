const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

const Text = require('../models/text');
const Image = require('../models/Image');
const User = require('../models/User');

function requireAdmin(req, res, next) {
  if (req.session.isAdmin) return next();
  res.redirect('/admin/login');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../public/uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.get('/login', (req, res) => {
  res.render('admin_login', { message: null });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.render('admin_login', { message: 'Fel användarnamn eller lösenord!' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.render('admin_login', { message: 'Fel användarnamn eller lösenord!' });
  }
  req.session.isAdmin = true;
  req.session.username = user.username;
  res.redirect('/admin/edit/text1');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.render('admin_loggedout'));
});

router.get('/edit/:key', requireAdmin, async (req, res) => {
  const key = req.params.key;
  let text = await Text.findOne({ key });
  if (!text) {
    text = await Text.create({ key, content: '' });
  }
  res.render('admin_edit', { key, content: text.content, message: null });
});

router.post('/edit/:key', requireAdmin, async (req, res) => {
  const key = req.params.key;
  const content = typeof req.body.content === "string" ? req.body.content : '';
  await Text.findOneAndUpdate(
    { key },
    { content },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  res.render('admin_edit', { key, content, message: 'Texten är uppdaterad!' });
});

router.get('/upload-image', requireAdmin, (req, res) => {
  res.render('admin_upload_image', { message: null });
});

router.post('/upload-image', requireAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.render('admin_upload_image', { message: 'Ingen fil valdes!' });
  }
  const newImage = new Image({ filename: req.file.filename });
  await newImage.save();
  res.render('admin_upload_image', { message: 'Bild uppladdad!' });
});

router.get('/images', requireAdmin, async (req, res) => {
  const images = await Image.find().sort({ uploadedAt: -1 });
  const imagesWithFile = images.filter(img =>
    fs.existsSync(path.join(__dirname, '../public/uploads', img.filename))
  );
  res.render('admin_images', { images: imagesWithFile });
});

router.post('/images/delete/:id', requireAdmin, async (req, res) => {
  const image = await Image.findById(req.params.id);
  if (image) {
    const filePath = path.join(__dirname, '../public/uploads', image.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    await image.deleteOne();
  }
  res.redirect('/admin/images');
});

module.exports = router;
