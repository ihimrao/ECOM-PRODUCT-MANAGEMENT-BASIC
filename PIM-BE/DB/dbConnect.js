const mongoose = require('mongoose');

const dbURL = process.env.DB || 'WRITE-YOUR-MONGODB-URI-HERE';

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;