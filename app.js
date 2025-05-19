require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const Text = require('./models/text');
console.log('Text-modellen:', Text);


const connectDB = require('./config/db');
const adminRouter = require('./routes/admin');
const indexRouter = require('./routes/index');

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

app.listen(port, () => {
  console.log(`Servern körs på http://localhost:${port}`);
});
