const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const helmet = require('helmet');
const path = require('path');

const app = express();

mongoose.connect('mongodb+srv://edvinranheden:igbLpvmjgEDHDkTd@skolprylar.kqdhv.mongodb.net/?retryWrites=true&w=majority&appName=skolprylar', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'valfrihemligsträng', //byt detta sen
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://edvinranheden:igbLpvmjgEDHDkTd@skolprylar.kqdhv.mongodb.net/?retryWrites=true&w=majority&appName=skolprylar',
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    sameSite: 'lax'
  }
}));

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/styles', express.static(path.join(__dirname, 'public/styles')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');

app.use('/', indexRouter);
app.use('/admin', adminRouter);

app.use((req, res) => {
  res.status(404).render('404', { url: req.originalUrl });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
