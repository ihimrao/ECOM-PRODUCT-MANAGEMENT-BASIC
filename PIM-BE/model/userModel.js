const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;