const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

async function createAdmin() {
  await mongoose.connect('mongodb+srv://edvinranheden:igbLpvmjgEDHDkTd@skolprylar.kqdhv.mongodb.net/?retryWrites=true&w=majority&appName=skolprylar', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const username = 'slutprojekt_user';
  const password = 'slutprojekt123';

  const hash = await bcrypt.hash(password, 10);

  const user = new User({ username, password: hash });
  await user.save();

  console.log('Admin-användare skapad!');
  mongoose.disconnect();
}

createAdmin();
