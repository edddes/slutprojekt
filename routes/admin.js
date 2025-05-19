const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// Byt ut dessa till dina egna värden!
const ADMIN_USERNAME = 'slutprojekt_user';
const ADMIN_PASSWORD_HASH = '$2b$10$Yzz/kILFU80VaSeeuNMeyuUlX1VDtblYrK6LERUuZ8VEVHvi9/bUq';

// Spara texten i minnet (för enkelhetens skull)
let text1Content = 'Här kan du redigera texten!';

// Visa login-formulär
router.get('/login', (req, res) => {
  res.render('admin_login', { error: null });
});

// Hantera login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (
    username === ADMIN_USERNAME &&
    await bcrypt.compare(password, ADMIN_PASSWORD_HASH)
  ) {
    req.session.isAdmin = true;
    res.redirect('/admin/edit/text1');
  } else {
    res.render('admin_login', { error: 'Fel användarnamn eller lösenord' });
  }
});

// Hantera utloggning och visa en utloggningssida med länk till startsidan
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.render('admin_loggedout');
  });
});

// Middleware för att skydda admin-routes
function requireAdmin(req, res, next) {
  if (req.session.isAdmin) {
    next();
  } else {
    res.redirect('/admin/login');
  }
}

// Visa redigeringssidan för text1
router.get('/edit/text1', requireAdmin, (req, res) => {
  res.render('admin_edit', { 
    key: 'text1',
    content: text1Content
  });
});

// Hantera sparad text från formuläret
router.post('/edit/text1', requireAdmin, (req, res) => {
  text1Content = req.body.content;
  res.render('admin_edit', { 
    key: 'text1',
    content: text1Content,
    message: 'Texten är uppdaterad!'
  });
});

// Gör texten tillgänglig för app.js
router.getText1Content = () => text1Content;

module.exports = router;
