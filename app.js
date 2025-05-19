const express = require('express');
const path = require('path');
const session = require('express-session');
const helmet = require('helmet');
const adminRoutes = require('./routes/admin'); // Importera admin-router

const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));

// Sessions för inloggning
app.use(session({
  secret: 'hemligsträng', // byt gärna till något eget!
  resave: false,
  saveUninitialized: false
}));

// Statiska filer (t.ex. CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Sätt EJS som vy-motor
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Koppla in admin-router på /admin
app.use('/admin', adminRoutes);

// Publik startsida som visar redigerad text
app.get('/', (req, res) => {
  res.render('index', { content: adminRoutes.getText1Content() });
});

// Starta servern
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
