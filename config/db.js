const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB ansluten');
  } catch (err) {
    console.error('Fel vid anslutning till MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
